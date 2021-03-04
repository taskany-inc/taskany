import { gql } from 'apollo-server-express';
import { ApolloServerTestClient } from 'apollo-server-testing';

import { createTestServer } from '../../lib/createTestSever';

const { run, stop } = createTestServer({ req: { user: {} } });

let server: ApolloServerTestClient;

describe('Post', () => {
    beforeAll(() => {
        server = run();
    });

    afterAll(stop);

    it('draft', async () => {
        const { mutate } = server;
        const user = gql`
            mutation {
                signupUser(data: { name: "Alice", email: "alice@prisma.io" }) {
                    id
                    email
                }
            }
        `;

        const draft = gql`
            mutation {
                createDraft(
                    title: "Join the Prisma Slack"
                    content: "https://slack.prisma.io"
                    authorEmail: "alice@prisma.io"
                ) {
                    id
                    published
                    author {
                        id
                        name
                    }
                }
            }
        `;

        await mutate({ mutation: user });

        const { data } = await mutate({ mutation: draft });
        expect(data).toMatchSnapshot();
    });

    it('returns feed', async () => {
        const { query } = server;
        const feed = gql`
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

        const { data } = await query({ query: feed });
        expect(data).toMatchSnapshot();
    });
});
