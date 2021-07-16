import React from 'react';
import Head from 'next/head';
import { GlobalStyle, Theme } from '@taskany/core/components';

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
                    <Root>
                        <Component {...pageProps} />
                    </Root>
                </NextAuth>
            </Apollo>
        </>
    );
}
