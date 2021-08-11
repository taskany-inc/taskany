import React from 'react';
import { Provider as AuthProvider } from 'next-auth/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { H1, GlobalStyle, Theme } from '@taskany/core/components';

import { Header } from '../../components/Header/Header';
import { Main } from '../../components/Main/Main';

interface RootProps {
    ssrSession: any;
}

const apolloClient = new ApolloClient({
    uri: '/api/gql',
    cache: new InMemoryCache(),
});

export const Root: React.FC<RootProps> = ({ children, ssrSession }) => {
    const page = ssrSession ? children : <H1>Access denied</H1>;

    return (
        <>
            <GlobalStyle />

            <Theme theme="light" />

            <ApolloProvider client={apolloClient}>
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
                    session={ssrSession}
                >
                    <Header />

                    <Main>{page}</Main>
                </AuthProvider>
            </ApolloProvider>
        </>
    );
};
