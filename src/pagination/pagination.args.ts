import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ConnectionArguments as IConnectionArguments } from '@devoxa/prisma-relay-cursor-connection';

@ArgsType()
export class ConnectionArguments implements IConnectionArguments {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}
