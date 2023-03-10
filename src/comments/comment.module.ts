import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentResolver } from './comment.resolver';

@Module({
  providers: [CommentResolver, CommentService, PrismaService],
  exports: [CommentService],
})
export class CommentModule {}
