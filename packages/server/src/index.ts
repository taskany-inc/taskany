import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { ApolloServer } from 'apollo-server-express';

import { createContext, buildSchema } from './database';

passport.use(
    new JwtStrategy(
        {
            secretOrKey: 'lol',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
            // FIXME: get/create user with prisma
            if (token) {
                return done(null, token);
            }
        },
    ),
);

const init = async () => {
    const graphql = new ApolloServer({
        schema: await buildSchema(),
        context: createContext(),
        playground: true,
    });

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // app.post(graphql.graphqlPath, passport.authenticate('jwt', { session: false }));

    const httpServer = http.createServer(app);

    graphql.applyMiddleware({ app });
    graphql.installSubscriptionHandlers(httpServer);

    httpServer.listen(4000, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at http://localhost:4000${graphql.graphqlPath}`);
    });
};

init();
