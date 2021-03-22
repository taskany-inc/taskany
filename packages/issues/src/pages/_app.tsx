import React, { useLayoutEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider as AuthProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as ReakitSsrProvider } from 'reakit';
import tinykeys from 'tinykeys';

import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';

const client = new ApolloClient({
    uri: '/api/gql',
    cache: new InMemoryCache(),
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Hack, monospace;
  }
`;

export default function App({ Component, pageProps }) {
    const router = useRouter();

    useLayoutEffect(() => {
        const unsubscribe = tinykeys(window, {
            'c q': () => {
                console.log('redirecting to new queque via hotkey');
                router.push('/queues/new');
            },
        });
        return () => {
            unsubscribe();
        };
    });

    return (
        <ApolloProvider client={client}>
            <AuthProvider
                // Provider options are not required but can be useful in situations where
                // you have a short session maxAge time. Shown here with default values.
                options={{
                    // Client Max Age controls how often the useSession in the client should
                    // contact the server to sync the session state. Value in seconds.
                    // e.g.
                    // * 0  - Disabled (always use cache value)
                    // * 60 - Sync session state with server if it's older than 60 seconds
                    clientMaxAge: 0,
                    // Keep Alive tells windows / tabs that are signed in to keep sending
                    // a keep alive request (which extends the current session expiry) to
                    // prevent sessions in open windows from expiring. Value in seconds.
                    //
                    // Note: If a session has expired when keep alive is triggered, all open
                    // windows / tabs will be updated to reflect the user is signed out.
                    keepAlive: 0,
                }}
                session={pageProps.session}
            >
                <Head>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack-subset.css" />
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <GlobalStyle />

                <ReakitSsrProvider>
                    <Header />

                    <Main>
                        <Component {...pageProps} />
                    </Main>
                </ReakitSsrProvider>
            </AuthProvider>
        </ApolloProvider>
    );
}
