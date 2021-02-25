import { PrismaClient } from '@prisma/client';
import { PubSub, Request } from 'apollo-server-express';
import * as tq from 'type-graphql';

import { PostResolver } from './Post/PostResolver';
import { UserResolver } from './User/UserResolver';

export const buildSchema = () =>
    tq.buildSchema({
        resolvers: [PostResolver, UserResolver],
    });

const prisma = new PrismaClient();
const pubsub = new PubSub();

export function createContext() {
    return ({ req }: { req: Request }) => ({ prisma, pubsub, req });
}
