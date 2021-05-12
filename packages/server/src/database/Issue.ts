import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql';

import { Issue } from '../@generated/prisma';
import { Context } from '../types/context';
import { TaskanyError } from '../types/error';

@InputType()
class CreateIssueInput {
    @Field()
    queue: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description?: string;
}

@Resolver(Issue)
export class IssueResolver {
    @Mutation(() => Issue)
    async createIssue(@Arg('issue') issue: CreateIssueInput, @Ctx() ctx: Context): Promise<Issue | TaskanyError> {
        const { resolvedUser: user } = ctx.req;
        if (!user) return { code: 401, message: 'Unauthorized' };

        const queue = await ctx.prisma.queue.findUnique({
            where: { key: issue.queue },
            include: { issues: { orderBy: { createdAt: 'desc' } } },
        });

        if (!queue) return { code: 404, message: 'Not found' };

        const lastIssue = queue.issues[0];
        const newIssueKey = lastIssue ? `${queue.key}-${Number(lastIssue.key.split('-')[1]) + 1}` : `${queue.key}-1`;

        return ctx.prisma.issue.create({
            data: {
                key: newIssueKey,
                title: issue.title,
                description: issue.description,
                queueId: queue.id,
                creatorId: user.id,
            },
        });
    }
}
