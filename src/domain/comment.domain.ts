import { HttpException } from '@nestjs/common';

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
}
export interface CommentRespone {
  data: Comment[];
  endpage: number;
}

export interface CommentRepository {
  createComment(comment: Comment): Promise<boolean>;
  updateComment(id:string,comment: Comment): Promise<boolean>;
  deleteComment(id: string): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
  getCommentsByPostId(postId: string, page: number): Promise<CommentRespone>;
}

export interface CommentUseCase {
  createComment(comment: Comment): Promise<boolean>;
  updateComment( id: string,comment: Comment): Promise<boolean>;
  deleteComment(id: string): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
  getCommentsByPostId(postId: string,page: number): Promise<CommentRespone>;
}

export interface CommentInterop {
  createComment(token: string,comment: Comment): any;
  updateComment(token: string,id: string,comment: Comment): any;
  deleteComment(token: string,id: string): any;
  getCommentById(token: string,id: string): Promise<Comment>;
  getComments(token: string): Promise<Comment[]>;
  getCommentsByPostId(token: string,postId: string, page: number): Promise<CommentRespone>;
}
export const ErrorCommentContent = 'Comment content cannot be empty';
export const ErrorCommentNotDeleted = 'Comment not deleted';
export const ErrorCommentAlreadyExits = 'Comment not updated';
export const ErrorCommentAuthorId = 'Comment authorId cannot be empty';
export const ErrorCommentPostId: HttpException = new HttpException(
  'ErrorCommentPostId',
  400,
);
export const ErrorPostId : HttpException = new HttpException(
  'Cant find PostId',
  400,
);
export const ErrorPostIdNotExist: HttpException = new HttpException(
  'PostId not exist',
  400,
);
export const ErrorEmptyPage: HttpException = new HttpException(
  'Comment page is empty',
  400,
);