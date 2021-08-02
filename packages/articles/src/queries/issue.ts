import gql from 'graphql-tag';

export const createIssue = gql`
    mutation createIssue($issue: CreateIssueInput!) {
        createIssue(issue: $issue) {
            key
            title
            description
        }
    }
`;
