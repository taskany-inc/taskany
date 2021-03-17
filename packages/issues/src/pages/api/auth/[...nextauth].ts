import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';
import { GraphQLClient } from 'graphql-request';

import { getSdk } from '../../../@generated/sdk';

const gqlClient = new GraphQLClient(process.env.TASKANY_GQL_GATE);

interface JWT {
    sub: string;
    name: string;
    email: string;
    image: string;
}

const encodeToken = ({ sub, name, email, image }: JWT) =>
    jwt.sign(
        {
            sub,
            name,
            email,
            image,
            iat: Date.now() / 1000,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        },
        process.env.TASKANY_JWT_SECRET,
        { algorithm: 'HS256' },
    );

export default NextAuth({
    providers: [
        process.env.EMAIL_SERVER &&
            Providers.Email({
                server: process.env.EMAIL_SERVER,
                from: process.env.EMAIL_FROM,
            }),
        process.env.TASKANY_APPLE_ID &&
            Providers.Apple({
                clientId: process.env.TASKANY_APPLE_ID,
                clientSecret: {
                    appleId: process.env.TASKANY_APPLE_ID,
                    teamId: process.env.TASKANY_APPLE_TEAM_ID,
                    privateKey: process.env.TASKANY_APPLE_PRIVATE_KEY,
                    keyId: process.env.TASKANY_APPLE_KEY_ID,
                },
            }),
        process.env.TASKANY_FACEBOOK_ID &&
            Providers.Facebook({
                clientId: process.env.TASKANY_FACEBOOK_ID,
                clientSecret: process.env.TASKANY_FACEBOOK_SECRET,
            }),
        process.env.TASKANY_GITHUB_ID &&
            Providers.GitHub({
                clientId: process.env.TASKANY_GITHUB_ID,
                clientSecret: process.env.TASKANY_GITHUB_SECRET,
            }),
        process.env.TASKANY_GOOGLE_ID &&
            Providers.Google({
                clientId: process.env.TASKANY_GOOGLE_ID,
                clientSecret: process.env.TASKANY_GOOGLE_SECRET,
            }),
        process.env.TASKANY_TWITTER_ID &&
            Providers.Twitter({
                clientId: process.env.TASKANY_TWITTER_ID,
                clientSecret: process.env.TASKANY_TWITTER_SECRET,
            }),
    ].filter(Boolean),
    secret: process.env.TASKANY_JWT_SECRET,
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.TASKANY_JWT_SECRET,
        encode: async ({ token }) => {
            return encodeToken({
                sub: token.sub,
                name: token.name,
                email: token.email,
                image: token.image,
            });
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
            return decodedToken;
        },
    },
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/api/auth/signin',  // Displays signin buttons
        // signOut: '/api/auth/signout', // Displays form with sign out button
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/api/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn(user, account, profile) {
            const token = encodeToken({
                sub: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            });

            gqlClient.setHeader('Authorization', `Bearer ${token}`);
            const gqlSdk = getSdk(gqlClient);

            const sync = await gqlSdk
                .signin({
                    user: { email: user.email, name: user.name, image: user.image },
                    account: {
                        providerType: account.type,
                        providerId: account.provider,
                        providerAccountId: account.id,
                    },
                })
                .catch((e) => {
                    // TODO: catch 401
                    console.error(e);
                });

            return sync ? sync.signin.email === user.email : false;
        },
        async session(session, user) {
            return {
                ...session,
                user: {
                    ...user,
                },
            };
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token.image = user.image;
            }

            return token;
        },
    },
    // https://next-auth.js.org/configuration/events
    events: {},

    debug: process.env.DEBUG,
});
