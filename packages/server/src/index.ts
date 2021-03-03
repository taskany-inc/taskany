import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ApolloServer } from 'apollo-server-express';

import { createContext, buildSchema } from './database';
import { log } from './lib/logger';

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.TASKANY_JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            // TODO: https://github.com/taskany-inc/taskany/issues/18
            if (token) {
                return done(null, token);
            }
        },
    ),
);

const init = async () => {
    log.verbose('init graphql server');
    const graphql = new ApolloServer({
        schema: await buildSchema(),
        context: createContext(),
        playground: true,
    });

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    log.verbose('setup jwt auth');
    app.post(graphql.graphqlPath, passport.authenticate('jwt', { session: false }));

    log.verbose('create http server');
    const httpServer = http.createServer(app);

    log.verbose('apply express app to apollo server');
    graphql.applyMiddleware({ app });
    log.verbose('init subscriptions');
    graphql.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.TASKANY_PORT, () => {
        log.info(`server is ready on port: ${process.env.TASKANY_PORT}.`);
        log.info(`graphql gate: ${graphql.graphqlPath}.`);
    });
};

init();
