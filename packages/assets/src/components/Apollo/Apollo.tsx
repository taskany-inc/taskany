import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

interface ApolloProps {}

const client = new ApolloClient({
    uri: '/api/gql',
    cache: new InMemoryCache(),
});

export const Apollo: React.FC<ApolloProps> = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);
