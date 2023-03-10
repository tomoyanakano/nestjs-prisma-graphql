import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostConnection, PostModel } from './post.model';
import { PostCreateInput } from './post.input';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ConnectionArguments } from 'src/pagination/pagination.args';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async findAll(connectionArgs: ConnectionArguments): Promise<PostConnection> {
    return await findManyCursorConnection(
      (args) => this.prisma.post.findMany({ ...args }),
      () => this.prisma.post.count(),
      connectionArgs,
    );
  }

  async findOneById(id: string): Promise<PostModel> {
    return await this.prisma.post.findUnique({ where: { id: id } });
  }

  async createPost(input: PostCreateInput): Promise<PostModel> {
    return await this.prisma.post.create({
      data: {
        title: input.title,
        emoji: input.emoji,
        contentPath: input.contentPath,
      },
    });
  }

  async like(id: string): Promise<PostModel> {
    return await this.prisma.post.update({
      where: { id: id },
      data: {
        like: {
          increment: 1,
        },
      },
    });
  }

  async unlike(id: string): Promise<PostModel> {
    return await this.prisma.post.update({
      where: { id: id },
      data: {
        like: { decrement: 1 },
      },
    });
  }
}
