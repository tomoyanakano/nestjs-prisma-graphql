import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { CommentConnection } from 'src/comments/comment.model';
import { Connection } from 'src/pagination/pagination.model';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contentPath: string;

  @Field(() => String)
  emoji: string;

  @Field(() => Int)
  like: number;

  @Field(() => Boolean, { nullable: true })
  published: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  publishDate?: Date;

  @Field(() => CommentConnection, { nullable: true })
  comments?: CommentConnection;
}

@ObjectType()
export class PostConnection extends Connection(PostModel) {}
