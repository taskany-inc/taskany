import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server-express';
import * as tq from 'type-graphql';

import { resolvers } from '../@generated/prisma';
import { TaskanyRequest } from '../types/context';

import { UserResolver } from './User';
import { QueueResolver } from './Queue';
import { IssueResolver } from './Issue';
import { AssetResolver } from './Asset';

export const buildSchema = () =>
    tq.buildSchemaSync({
        resolvers: [...resolvers, UserResolver, QueueResolver, IssueResolver, AssetResolver],
    });

const prisma = new PrismaClient();
const pubsub = new PubSub();

export const createContext = () => async ({ req }: { req: TaskanyRequest }) => {
    req.resolvedUser = await prisma.user.findUnique({
        where: { email: req.user.email },
    });

    return { prisma, pubsub, req };
};
