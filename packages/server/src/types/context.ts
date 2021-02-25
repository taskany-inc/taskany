import { PrismaClient } from '@prisma/client';
import { PubSub, Request } from 'apollo-server-express';

export interface Context {
    prisma: PrismaClient;
    pubsub: PubSub;
    req: Request;
}
