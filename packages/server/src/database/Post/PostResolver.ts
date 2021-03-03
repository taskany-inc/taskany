import 'reflect-metadata';
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    FieldResolver,
    Root,
    Int,
    InputType,
    Field,
    PubSub,
    Subscription,
    PubSubEngine,
} from 'type-graphql';
import { Post, User } from '@generated/prisma';

import { Context } from '../../types/context';

@InputType()
class PostIDInput {
    @Field(() => Int)
    id: number;
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver()
    author(@Root() post: Post, @Ctx() ctx: Context): Promise<User | null> {
        return ctx.prisma.post
            .findUnique({
                where: {
                    id: post.id,
                },
            })
            .author();
    }

    @Query(() => Post, { nullable: true })
    post(@Arg('where') where: PostIDInput, @Ctx() ctx: Context) {
        return ctx.prisma.post.findUnique({
            where: { id: where.id },
        });
    }

    @Query(() => [Post])
    filterPosts(@Ctx() ctx: Context, @Arg('searchString') searchString: string) {
        return ctx.prisma.post.findMany({
            where: {
                OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }],
            },
        });
    }

    @Query(() => [Post])
    feed(@Ctx() ctx: Context) {
        return ctx.prisma.post.findMany({
            where: {
                published: true,
            },
        });
    }

    @Mutation(() => Post)
    async createDraft(
        @Ctx() ctx: Context,
        @PubSub() pubSub: PubSubEngine,

        @Arg('title') title: string,
        @Arg('content', { nullable: true }) content: string,
        @Arg('authorEmail') authorEmail: string,
    ): Promise<Post> {
        const post = await ctx.prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: { email: authorEmail },
                },
            },
        });

        await pubSub.publish('POSTS', post);

        return post;
    }

    @Subscription({ topics: 'POSTS' })
    postsSubscription(@Root() { id, title, content, published }: Post): Post {
        return { id, title, content, published };
    }

    @Mutation(() => Post, { nullable: true })
    publish(@Arg('id', () => Int) id: number, @Ctx() ctx: Context): Promise<Post | null> {
        return ctx.prisma.post.update({
            where: {
                id,
            },
            data: {
                published: true,
            },
        });
    }

    @Mutation(() => Post, { nullable: true })
    deleteOnePost(@Arg('where') where: PostIDInput, @Ctx() ctx: Context): Promise<Post | null> {
        return ctx.prisma.post.delete({
            where: {
                id: where.id,
            },
        });
    }
}
