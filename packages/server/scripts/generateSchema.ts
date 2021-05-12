import 'reflect-metadata';
import * as tq from 'type-graphql';

import { resolvers } from '../src/@generated/prisma';
import { UserResolver } from '../src/database/User';
import { QueueResolver } from '../src/database/Queue';
import { IssueResolver } from '../src/database/Issue';

const schema = tq.buildSchemaSync({
    resolvers: [...resolvers, UserResolver, QueueResolver, IssueResolver],
});

tq.emitSchemaDefinitionFileSync('./schema.graphql', schema);
