import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx, InputType, Field, Query } from 'type-graphql';

import { Asset } from '../@generated/prisma';
import { Context } from '../types/context';
import { TaskanyError } from '../types/error';

@InputType()
class CreateAssetInput {
    @Field()
    key: string;

    @Field()
    url: string;
}

@Resolver(Asset)
export class AssetResolver {
    @Mutation(() => Asset)
    async createAsset(@Arg('asset') asset: CreateAssetInput, @Ctx() ctx: Context): Promise<Asset | TaskanyError> {
        const { resolvedUser: user } = ctx.req;
        if (!user) return { code: 401, message: 'Unauthorized' };

        return ctx.prisma.asset.create({
            data: {
                key: asset.key,
                url: asset.url,
                creatorId: user.id,
            },
        });
    }

    @Query(() => [Asset], { nullable: true })
    async allAssets(@Ctx() ctx: Context) {
        const { resolvedUser: user } = ctx.req;
        if (!user) return { code: 401, message: 'Unauthorized' };

        return ctx.prisma.asset.findMany({
            where: { creatorId: user.id },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
