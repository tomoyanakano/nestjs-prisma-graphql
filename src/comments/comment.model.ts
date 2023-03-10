import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Connection } from 'src/pagination/pagination.model';

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

@ObjectType()
export class CommentConnection extends Connection(CommentModel) {}
