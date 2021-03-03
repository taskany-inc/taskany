import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';

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
        encode: async ({ secret, token }) => {
            const payload = {
                sub: token.sub,
                name: token.name,
                email: token.email,
                picture: token.picture,
                iat: Date.now() / 1000,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            };
            const encodedToken = jwt.sign(payload, secret, { algorithm: 'HS256' });
            return encodedToken;
        },
        decode: async ({ secret, token }) => {
            const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
            return decodedToken;
        },
    },

    // You can define custom pages to override the built-in pages.
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        // signIn: '/api/auth/signin',  // Displays signin buttons
        // signOut: '/api/auth/signout', // Displays form with sign out button
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/api/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        // async session(session, user) { return session },
        // async jwt(token, user, account, profile, isNewUser) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    debug: process.env.DEBUG,
});
