import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentModel } from './comment.model';
import { CommentService } from './comment.service';
import { CommentCreateInput } from './comment.input';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Mutation(() => CommentModel, { name: 'commentCreate' })
  async createComment(@Args('input') input: CommentCreateInput) {
    return await this.commentService.createComment(input);
  }

  @Mutation(() => CommentModel, { name: 'commentDelete' })
  async deleteComment(@Args('id') id: string) {
    return await this.commentService.deleteComment(id);
  }
}
