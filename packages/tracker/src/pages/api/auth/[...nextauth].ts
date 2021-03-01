import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        // Providers.Apple({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: {
        //         appleId: process.env.APPLE_ID,
        //         teamId: process.env.APPLE_TEAM_ID,
        //         privateKey: process.env.APPLE_PRIVATE_KEY,
        //         keyId: process.env.APPLE_KEY_ID,
        //     },
        // }),
        // Providers.Auth0({
        //     clientId: process.env.AUTH0_ID,
        //     clientSecret: process.env.AUTH0_SECRET,
        //     domain: process.env.AUTH0_DOMAIN,
        // }),
        // Providers.Facebook({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        Providers.GitHub({
            clientId: 'Iv1.31291a6f627c9972', // process.env.GITHUB_ID,
            clientSecret: '0dfbfec067951351e0aee8ba110b434856e3744b', // process.env.GITHUB_SECRET,
        }),
        // Providers.Google({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // Providers.Twitter({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
    ],
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        jwt: true,
    },

    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        secret: 'lol', // process.env.JWT_SECRET
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

    // Enable debug messages in the console if you are having problems
    debug: false,
});
