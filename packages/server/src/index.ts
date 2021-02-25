import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import { createContext, buildSchema } from './database';

const init = async () => {
    const graphql = new ApolloServer({
        schema: await buildSchema(),
        context: createContext(),
        playground: true,
    });

    const app = express();
    app.use(bodyParser.json());

    const httpServer = http.createServer(app);

    graphql.applyMiddleware({ app });
    graphql.installSubscriptionHandlers(httpServer);

    httpServer.listen(4000, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at http://localhost:4000${graphql.graphqlPath}`);
    });
};

init();
