import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root, Int, InputType, Field } from 'type-graphql';

import { Context } from '../../types/context';
import { Post } from '../Post/Post';

import { User } from './User';

@InputType()
class SignupUserInput {
    @Field({ nullable: true })
    name: string;

    @Field()
    email: string;
}

@Resolver(User)
export class UserResolver {
    @FieldResolver()
    async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[]> {
        return ctx.prisma.user
            .findUnique({
                where: {
                    id: user.id,
                },
            })
            .posts();
    }

    @Mutation(() => User)
    async signupUser(@Arg('data') data: SignupUserInput, @Ctx() ctx: Context): Promise<User> {
        return ctx.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
            },
        });
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('id', () => Int) id: number, @Ctx() ctx: Context) {
        return ctx.prisma.user.findUnique({
            where: { id },
        });
    }
}
