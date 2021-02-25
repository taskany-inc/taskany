import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

import { User } from '../User/User';

@ObjectType()
export class Post {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field(() => String, { nullable: true })
    content: string | null;

    @Field(() => Boolean, { nullable: true })
    published?: boolean | null;

    @Field(() => User, { nullable: true })
    author?: User | null;
}
