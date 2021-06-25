import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, InputType, Field, Query } from 'type-graphql';

import { Queue } from '../@generated/prisma';
import { Context } from '../types/context';
import { TaskanyError } from '../types/error';

@InputType()
class CreateQueueInput {
    @Field()
    key: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(Queue)
export class QueueResolver {
    @Mutation(() => Queue)
    async createQueue(@Arg('queue') queue: CreateQueueInput, @Ctx() ctx: Context): Promise<Queue | TaskanyError> {
        const { resolvedUser: user } = ctx.req;
        if (!user) return { code: 401, message: 'Unauthorized' };

        return ctx.prisma.queue.create({
            data: {
                ...queue,
                key: queue.key.toUpperCase(),
                ownerId: user.id,
                creatorId: user.id,
            },
        });
    }

    @Query(() => Queue, { nullable: true })
    async queueByKey(@Arg('key', () => String) key: string, @Ctx() ctx: Context) {
        return ctx.prisma.queue.findUnique({
            where: { key },
            include: {
                issues: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }
}
