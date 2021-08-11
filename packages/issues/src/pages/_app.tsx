import React from 'react';
import Head from 'next/head';

import { Root } from '../components/Root/Root';
import { useHotkeys } from '../hooks/useHotkeys';

export default function App({ Component, pageProps }) {
    useHotkeys();

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Root ssrSession={pageProps.session}>
                <Component {...pageProps} />
            </Root>
        </>
    );
}
