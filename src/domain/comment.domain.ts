export interface Comment {
  id: string;
  content: string;
  postId: string;
  replyId: string;
  reactions: string[];
  authorId: string;
}
