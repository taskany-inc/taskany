import gql from 'graphql-tag';

export const getFeed = gql`
    query {
        feed {
            id
            title
            content
            published
            author {
                id
                name
                email
            }
        }
    }
`;
