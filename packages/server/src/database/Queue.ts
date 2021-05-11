import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql';

import { Queue } from '../@generated/prisma';
import { Context } from '../types/context';
import { TaskanyError } from '../types/error';

@InputType()
class CreateQueueInput {
    @Field()
    key: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(Queue)
export class QueueResolver {
    @Mutation(() => Queue)
    async createQueue(@Arg('queue') queue: CreateQueueInput, @Ctx() ctx: Context): Promise<Queue | TaskanyError> {
        const { resolvedUser: user } = ctx.req;
        if (!user) return { code: 401, message: 'Unauthorized' };

        const data = {
            ...queue,
            ownerId: user.id,
            creatorId: user.id,
        };

        return ctx.prisma.queue.create({
            data,
        });
    }
}
