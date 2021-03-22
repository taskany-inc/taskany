import React, { useLayoutEffect } from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Provider as ReakitSsrProvider } from 'reakit';
import tinykeys from 'tinykeys';

import { GlobalStyle } from '../components/GlobalStyle/GlobalStyle';
import { Theme } from '../components/Theme/Theme';
import { Apollo } from '../components/Apollo/Apollo';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';

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
        <Apollo>
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
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <GlobalStyle />

                <Theme />

                <ReakitSsrProvider>
                    <Header />

                    <Main>
                        <Component {...pageProps} />
                    </Main>
                </ReakitSsrProvider>
            </AuthProvider>
        </Apollo>
    );
}
