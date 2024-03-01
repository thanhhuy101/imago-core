export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
}

export interface CommentRepository {
  createComment(comment: Comment): Promise<boolean>;
  updateComment(id:string,comment: Comment): Promise<boolean>;
  deleteComment(id: string): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
}

export interface CommentUseCase {
  createComment(comment: Comment): Promise<boolean>;
  updateComment( id: string,comment: Comment): Promise<boolean>;
  deleteComment(id: string): Promise<boolean>;
  getCommentById(id: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
}

export interface CommentInterop {
  createComment(token: string,comment: Comment): any;
  updateComment(token: string,id: string,comment: Comment): any;
  deleteComment(token: string,id: string): any;
  getCommentById(token: string,id: string): Promise<Comment>;
  getComments(token: string): Promise<Comment[]>;
}
export const ErrorCommentContent = 'Comment content cannot be empty';
export const ErrorCommentNotDeleted = 'Comment not deleted';
export const ErrorCommentAlreadyExits = 'Comment not updated';
export const ErrorCommentAuthorId = 'Comment authorId cannot be empty';
