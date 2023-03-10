import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostCreateInput {
  @Field({ nullable: false })
  title: string;
  @Field({ nullable: false })
  emoji: string;
  @Field({ nullable: false })
  contentPath: string;
}
