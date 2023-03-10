import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field({ nullable: false })
  postId: string;
  @Field({ nullable: false })
  content: string;
}
