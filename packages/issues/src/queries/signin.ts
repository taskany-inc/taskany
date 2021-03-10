import gql from 'graphql-tag';

export const signin = gql`
    mutation signin($user: SigninUserInput!, $account: SigninAccountInput!) {
        signin(user: $user, account: $account) {
            id
            email
        }
    }
`;
