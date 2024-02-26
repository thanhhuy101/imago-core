export interface PostDomain {
  id: string;
  creatorId: string;
  share: string[];
  photoUrl: string[];
  content: string;
  hashtag: string[];
  cateId: string[];
  reaction: string[];
  comments: Comment[];
}
export interface Comment {
  authorId: string;
  content: string;
  id: string;
  postId: string;
  reaction: [];
  replyId: string;
}
export interface PostRepository {
  getPost(id: string): Promise<PostDomain>;
  getPostsByUid(creatorId: string): Promise<PostDomain[]>;
  getPostsByCateId(cateId: string): Promise<PostDomain[]>;
  getSharedPost(uid: string): Promise<PostDomain[]>;
  createPost(post: PostDomain): Promise<boolean>;
  updatePost(post: PostDomain): Promise<boolean>;
  deletePost(id: string): Promise<boolean>;
}
export interface PostUseCase {
  getPost(id: string): Promise<PostDomain>;
  getPostsByUid(creatorId: string): Promise<PostDomain[]>;
  getPostsByCateId(cateId: string): Promise<PostDomain[]>;
  getSharedPost(uid: string): Promise<PostDomain[]>;
  createPost(post: PostDomain): Promise<boolean>;
  updatePost(post: PostDomain): Promise<boolean>;
  deletePost(id: string): Promise<boolean>;
}
export interface PostInterop {
  getPost(id: string): Promise<PostDomain>;
  getPostsByUid(creatorId: string): Promise<PostDomain[]>;
  getPostsByCateId(cateId: string): Promise<PostDomain[]>;
  getSharedPost(uid: string): Promise<PostDomain[]>;
  createPost(post: PostDomain): Promise<boolean>;
  updatePost(post: PostDomain): Promise<boolean>;
  deletePost(id: string): Promise<boolean>;
}

export const ErrorPostNotFound = 'Post not found';
export const ErrorPostDeleteFailed = 'Post not found to delete';
export const ErrorPostCreateFailed = 'Post create failed';
export const ErrorPostUpdateFailed = 'Post update failed';
