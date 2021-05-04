import React from 'react';
import Head from 'next/head';
import { Provider as ReakitSsrProvider } from 'reakit';

import { GlobalStyle } from '../components/GlobalStyle/GlobalStyle';
import { Theme } from '../components/Theme/Theme';
import { Apollo } from '../components/Apollo/Apollo';
import { NextAuth } from '../components/NextAuth/NextAuth';
import { Root } from '../components/Root/Root';
import { useHotkeys } from '../hooks/useHotkeys';

export default function App({ Component, pageProps }) {
    useHotkeys();

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <GlobalStyle />

            <Theme theme="light" />

            <Apollo>
                <NextAuth session={pageProps.session}>
                    <ReakitSsrProvider>
                        <Root>
                            <Component {...pageProps} />
                        </Root>
                    </ReakitSsrProvider>
                </NextAuth>
            </Apollo>
        </>
    );
}
