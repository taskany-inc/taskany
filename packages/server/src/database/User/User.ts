import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, Int, InputType, Field } from 'type-graphql';

import { User } from '../../@generated/prisma';
import { Context } from '../../types/context';

@InputType()
class SigninUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    image?: string;
}

@InputType()
class SigninAccountInput {
    @Field()
    providerType: string;

    @Field()
    providerId: string;

    @Field()
    providerAccountId: number;
}

@Resolver(User)
export class UserResolver {
    @Mutation(() => User)
    async signin(
        @Arg('user') user: SigninUserInput,
        @Arg('account') account: SigninAccountInput,
        @Ctx() ctx: Context,
    ): Promise<User> {
        const u = await ctx.prisma.user.findUnique({
            where: { email: user.email },
            include: {
                accounts: {
                    where: { providerAccountId: account.providerAccountId },
                },
            },
        });

        if (u === null) {
            return ctx.prisma.user.create({
                data: {
                    ...user,
                    accounts: {
                        create: account,
                    },
                },
            });
        }

        if (!u.accounts.length) {
            ctx.prisma.account.create({
                data: {
                    ...account,
                    user: {
                        connect: {
                            id: u.id,
                        },
                    },
                },
            });
        }

        return u;
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('email', () => String) email: string, @Ctx() ctx: Context) {
        return ctx.prisma.user.findUnique({
            where: { email },
        });
    }
}
