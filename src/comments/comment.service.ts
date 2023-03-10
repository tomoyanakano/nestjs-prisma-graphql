import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentConnection, CommentModel } from './comment.model';
import { CommentCreateInput } from './comment.input';
import {
  ConnectionArguments,
  findManyCursorConnection,
} from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
  async findManyByPostId(
    connectionArgs: ConnectionArguments,
    id: string,
  ): Promise<CommentConnection> {
    const queryArgs = { where: { postId: id } };
    return await findManyCursorConnection(
      (args) => this.prisma.comment.findMany({ ...args, ...queryArgs }),
      () => this.prisma.comment.count(),
      connectionArgs,
    );
  }

  async createComment(input: CommentCreateInput): Promise<CommentModel> {
    return await this.prisma.comment.create({
      data: input,
    });
  }

  async deleteComment(id: string) {
    return await this.prisma.comment.delete({ where: { id: id } });
  }
}
