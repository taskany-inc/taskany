import 'reflect-metadata';
import * as tq from 'type-graphql';

import { resolvers } from '../src/@generated/prisma';
import { UserResolver } from '../src/database/User/User';

const schema = tq.buildSchemaSync({
    resolvers: [...resolvers, UserResolver],
});

tq.emitSchemaDefinitionFileSync('./schema.graphql', schema);
