import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostConnection, PostModel } from './post.model';
import { PostService } from './post.service';
import { PostCreateInput } from './post.input';
import { CommentService } from 'src/comments/comment.service';
import { CommentConnection } from 'src/comments/comment.model';
import { ConnectionArguments } from 'src/pagination/pagination.args';

@Resolver((of) => PostModel)
export class PostResolver {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @Query(() => PostConnection, { name: 'posts', nullable: true })
  async findAll(@Args() connectionArgs: ConnectionArguments) {
    return await this.postService.findAll(connectionArgs);
  }

  @Query(() => PostModel, { name: 'post', nullable: true })
  async getPost(@Args('id', { type: () => String }) id: string) {
    return await this.postService.findOneById(id);
  }

  @Mutation(() => PostModel, { name: 'postCreate' })
  async createPost(@Args('input') input: PostCreateInput) {
    return await this.postService.createPost(input);
  }

  @Mutation(() => PostModel, { name: 'likePost' })
  async like(@Args('id', { type: () => String }) id: string) {
    return await this.postService.like(id);
  }

  @Mutation(() => PostModel, { name: 'unlikePost' })
  async unlike(@Args('id', { type: () => String }) id: string) {
    return await this.postService.unlike(id);
  }

  @ResolveField('comments', (returns) => CommentConnection)
  async comments(
    @Parent() post: PostModel,
    @Args() connectionArgs: ConnectionArguments,
  ) {
    const { id } = post;
    return this.commentService.findManyByPostId(connectionArgs, id);
  }
}
