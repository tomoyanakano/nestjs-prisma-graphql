import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentModule } from 'src/comments/comment.module';

@Module({
  imports: [CommentModule],
  providers: [PostService, PostResolver, PrismaService],
})
export class PostModule {}
