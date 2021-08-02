import gql from 'graphql-tag';

export const createQueue = gql`
    mutation createQueue($queue: CreateQueueInput!) {
        createQueue(queue: $queue) {
            key
            title
            description
        }
    }
`;

export const queueByKey = gql`
    query queueByKey($key: String!) {
        queueByKey(key: $key) {
            key
            title
            description
            issues {
                key
                title
                createdAt
                createdBy {
                    name
                }
            }
        }
    }
`;

export const allQueues = gql`
    query allQueues {
        allQueues {
            key
            title
        }
    }
`;
