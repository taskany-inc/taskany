import { PrismaClient } from '@prisma/client';
import { PubSub, Request } from 'apollo-server-express';
import * as tq from 'type-graphql';

import { resolvers } from '../@generated/prisma';

import { UserResolver } from './User/User';

export const buildSchema = () =>
    tq.buildSchemaSync({
        resolvers: [...resolvers, UserResolver],
    });

const prisma = new PrismaClient();
const pubsub = new PubSub();

export function createContext() {
    return ({ req }: { req: Request }) => ({ prisma, pubsub, req });
}
