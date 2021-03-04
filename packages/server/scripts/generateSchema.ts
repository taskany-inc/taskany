import 'reflect-metadata';
import * as tq from 'type-graphql';

import { resolvers } from '../src/@generated/prisma';
import { PostResolver } from '../src/database/Post/Post';
import { UserResolver } from '../src/database/User/User';

const schema = tq.buildSchemaSync({
    resolvers: [...resolvers, PostResolver, UserResolver],
});

tq.emitSchemaDefinitionFileSync('./schema.graphql', schema);
