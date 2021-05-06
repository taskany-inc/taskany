import 'reflect-metadata';
import * as tq from 'type-graphql';

import { resolvers } from '../src/@generated/prisma';
import { UserResolver } from '../src/database/User';
import { QueueResolver } from '../src/database/Queue';

const schema = tq.buildSchemaSync({
    resolvers: [...resolvers, UserResolver, QueueResolver],
});

tq.emitSchemaDefinitionFileSync('./schema.graphql', schema);
