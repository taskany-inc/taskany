import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';

import { Post } from '../Post/Post';

@ObjectType()
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    @IsEmail()
    email: string;

    @Field(() => String, { nullable: true })
    name?: string | null;

    @Field(() => [Post], { nullable: true })
    posts?: [Post] | null;
}
