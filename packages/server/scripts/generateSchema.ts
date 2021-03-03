import { resolvers } from '@generated/prisma';
import * as tq from 'type-graphql';

import { PostResolver } from '../src/database/Post/PostResolver';
import { UserResolver } from '../src/database/User/UserResolver';

const schema = tq.buildSchemaSync({
    resolvers: [...resolvers, PostResolver, UserResolver],
});

tq.emitSchemaDefinitionFile('./schema.graphql', schema);
