import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Edge as IEdge,
  PageInfo as IPageInfo,
  Connection as IConnection,
} from '@devoxa/prisma-relay-cursor-connection';

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field(() => Boolean)
  hasPreviousPage: boolean;
  @Field(() => Boolean)
  hasNextPage: boolean;
  @Field(() => String, { nullable: true })
  startCursor: string;
  @Field(() => String, { nullable: true })
  endCursor: string;
}

export function Connection<T>(classRef: Type<T>): Type<IConnection<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class Edge implements IEdge<T> {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class Connection implements IConnection<T> {
    @Field(() => [classRef], { nullable: false })
    nodes: T[];
    @Field(() => Int, { nullable: false })
    totalCount: number;
    @Field(() => [Edge], { nullable: false })
    edges: Edge[];

    @Field(() => PageInfo, { nullable: false })
    pageInfo: PageInfo;
  }
  return Connection as Type<IConnection<T>>;
}
