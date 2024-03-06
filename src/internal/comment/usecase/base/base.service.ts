import { Body, Inject, Injectable } from '@nestjs/common';
import {
  Comment,
  CommentRepository,
  CommentUseCase, ErrorCommentAlreadyExits, ErrorCommentAuthorId,
  ErrorCommentContent, ErrorCommentNotDeleted,
} from '../../../../domain/comment.domain';

@Injectable()
export class CommentUseCaseBaseService implements CommentUseCase {
  constructor(@Inject('CommentRepository') private repository: CommentRepository) {
  }



  async createComment(comment: Comment): Promise<boolean> {
    if(comment.content === '' || comment.content === null || comment.content === undefined){
      console.error(ErrorCommentContent)  }
    if (comment.authorId === '' || comment.authorId === null || comment.authorId === undefined) {
      console.error(ErrorCommentAuthorId)
    }
    let exists = await this.repository.getCommentById(comment.id);
    if (exists) {
      console.error(ErrorCommentAlreadyExits)
    }
    return this.repository.createComment(comment);
  }
    updateComment(id:string, comment: Comment): Promise<boolean> {
        return this.repository.updateComment(id, comment);
    }
    async deleteComment(id: string, comment: Comment): Promise<boolean> {
        let exists = await this.repository.getCommentById(id);
        if (!exists) {
            console.error(ErrorCommentNotDeleted)
        }
        return this.repository.deleteComment(id, comment);
    }
    async getCommentById(id: string): Promise<Comment> {
        return await this.repository.getCommentById(id);
    }
  async getCommentsByPostId(postId: string): Promise<Comment[]> {

    return await this.repository.getCommentsByPostId(postId);
  }
    async getComments(): Promise<Comment[]> {
        return await this.repository.getComments();
    }
}
