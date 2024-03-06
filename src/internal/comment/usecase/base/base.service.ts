import { Body, HttpException, Inject, Injectable } from '@nestjs/common';
import {
  Comment,
  CommentRepository,
  CommentUseCase,
  ErrorCommentAlreadyExits,
  ErrorCommentAuthorId,
  ErrorCommentContent,
  ErrorCommentNotCreated,
  ErrorCommentNotDeleted, ErrorCommentNotfound,
  ErrorCommentNotString,
  ErrorCommentNotUpdatedByIdNotTheSame,
} from '../../../../domain/comment.domain';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class CommentUseCaseBaseService implements CommentUseCase {
  constructor(@Inject('CommentRepository') private repository: CommentRepository) {
  }



  async createComment(comment: Comment): Promise<boolean> {
    if (!comment.id || !comment.postId || !comment.content || !comment.authorId) {
      throw ErrorCommentNotCreated;
    }
    if(comment.content === '' || comment.content === null || comment.content === undefined){
      throw ErrorCommentContent;
    }
    if (comment.authorId === '' || comment.authorId === null || comment.authorId === undefined) {
      throw ErrorCommentAuthorId;
    }
    if (typeof (comment.id) !== 'string') {
      throw ErrorCommentNotString;
    }
    let exists = await this.repository.getCommentById(comment.id);
    if (exists) {
      throw ErrorCommentAlreadyExits;
    }
    return this.repository.createComment(comment);
  }
     updateComment(id:string, comment: Comment): Promise<boolean> {
       if(id !== comment.id){
        throw ErrorCommentNotUpdatedByIdNotTheSame;
      }
      if(comment.content.trim()===""){
        throw ErrorCommentContent;
      }
        return  this.repository.updateComment(id, comment);
    }
    async deleteComment(id: string, comment: Comment): Promise<boolean> {
        let exists = await this.repository.getCommentById(id);
        if (!exists) {
          throw ErrorCommentNotDeleted;
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
    let exists = await this.repository.getComments();
    if (!exists) {
      throw ErrorCommentNotfound;
    }
        return await this.repository.getComments();
    }
}
