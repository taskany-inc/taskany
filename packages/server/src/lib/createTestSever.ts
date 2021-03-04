import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import { PubSub, ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { buildSchema } from '../database';

const prisma = new PrismaClient();
const pubsub = new PubSub();

export function createContext({ req }: { req: { user: unknown } }) {
    return () => ({ prisma, pubsub, req });
}

export const createTestServer = ({ req }: { req: { user: unknown } }) => {
    const graphql = new ApolloServer({
        schema: buildSchema(),
        context: createContext({ req }),
        playground: false,
    });

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const httpServer = http.createServer(app);

    graphql.applyMiddleware({ app });
    graphql.installSubscriptionHandlers(httpServer);

    return {
        run: () => createTestClient(graphql),
        stop: () => {
            graphql.stop();
            httpServer.close();
            prisma.$disconnect();
        },
    };
};
