import gql from 'graphql-tag';

export const createQueue = gql`
    mutation createQueue($queue: CreateQueueInput!) {
        createQueue(queue: $queue) {
            key
            description
        }
    }
`;
