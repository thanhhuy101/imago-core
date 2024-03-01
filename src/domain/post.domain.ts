import { Comment } from './comment.domain';
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
  mention: string[];
}

export interface PostRepository {
  getDetail(id: string): Promise<PostDomain>;
  getAllByUid(creatorId: string): Promise<PostDomain[]>;
  getByCateId(cateId: string): Promise<PostDomain[]>;
  getShare(uid: string): Promise<PostDomain[]>;
  create(post: PostDomain): Promise<boolean>;
  update(post: PostDomain): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getByMentionId(mention: string): Promise<PostDomain[]>;
}
export interface PostUseCase {
  getDetail(id: string): Promise<PostDomain>;
  getAllByUid(creatorId: string): Promise<PostDomain[]>;
  getByCateId(cateId: string): Promise<PostDomain[]>;
  getShare(uid: string): Promise<PostDomain[]>;
  create(post: PostDomain): Promise<boolean>;
  update(post: PostDomain): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getByMentionId(mention: string): Promise<PostDomain[]>;
}
export interface PostInterop {
  getDetail(id: string,token: string): Promise<PostDomain>;
  getAllByUid(creatorId: string,token: string): Promise<PostDomain[]>;
  getByCateId(cateId: string,token: string): Promise<PostDomain[]>;
  getShare(uid: string,token: string): Promise<PostDomain[]>;
  create(post: PostDomain,token: string): Promise<boolean>;
  update(post: PostDomain,token: string): Promise<boolean>;
  delete(id: string,token: string): Promise<boolean>;
  getByMentionId(mention: string,token: string): Promise<PostDomain[]>;
}


export const ErrorPostNotFound = 'Post not found';
export const ErrorPostDeleteFailed = 'Post not found to delete';
export const ErrorPostCreateFailed = 'Post create failed';
export const ErrorPostUpdateFailed = 'Post update failed';
