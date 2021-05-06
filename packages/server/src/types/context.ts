import { PrismaClient } from '@prisma/client';
import { PubSub, Request } from 'apollo-server-express';

import { User } from '../@generated/prisma';

export interface TaskanyRequest extends Request {
    user: {
        sub: string;
        name: string;
        email: string;
        image: string;
        iat: string;
        exp: string;
    };
    resolvedUser: User | null;
}

export interface Context {
    prisma: PrismaClient;
    pubsub: PubSub;
    req: TaskanyRequest;
}
