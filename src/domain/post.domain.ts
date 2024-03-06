import { HttpException } from '@nestjs/common';
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
  createdAt: Date;
}

export interface PostResponse {
  data: PostDomain[];
  endpage: number;
}

export interface PostRepository {
  getDetail(id: string): Promise<PostDomain>;

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getMine(id: string, page: number, size: number): Promise<PostResponse>;

  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getShare(uid: string, page: number, size: number): Promise<PostResponse>;

  create(post: PostDomain): Promise<boolean>;

  update(post: PostDomain): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  getPostById(id: string): Promise<PostDomain>;

  getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(): Promise<PostDomain[]>;
}

export interface PostUseCase {
  getDetail(id: string): Promise<PostDomain>;

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getPostById(id: string): Promise<PostDomain>;

  getMine(id: string, page: number, size: number): Promise<PostResponse>;

  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getShare(uid: string, page: number, size: number): Promise<PostResponse>;

  create(post: PostDomain): Promise<boolean>;

  update(post: PostDomain): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(): Promise<PostDomain[]>;
}

export interface PostInterop {
  getDetail(id: string, token: string): Promise<PostDomain>;

  getAllByUid(
    token: string,
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getMine(token: string, page: number, size: number): Promise<PostResponse>;

  getByCateId(
    cateId: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getShare(
    uid: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getPostById(id: string, token: string): Promise<PostDomain>;

  create(post: PostDomain, token: string): Promise<boolean>;

  update(post: PostDomain, token: string): Promise<boolean>;

  delete(id: string, token: string): Promise<boolean>;

  getByMentionId(
    mention: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostResponse>;

  getAllPost(token: string): Promise<PostDomain[]>;
}

export const ErrorPostNotFound: HttpException = new HttpException(
  'Post not found',
  400,
);
export const ErrorPostDeleteFailed: HttpException = new HttpException(
  'Post not found to delete',
  400,
);
export const ErrorPostCreateFailed: HttpException = new HttpException(
  'Post create failed',
  400,
);

export const ErrorPostUpdateFailed: HttpException = new HttpException(
  'Post update failed',
  400,
);
export const ErrorEmptySize: HttpException = new HttpException(
  'Post size is empty',
  400,
);
export const ErrorEmptyPage: HttpException = new HttpException(
  'Post page is empty',
  400,
);
export const ErrorMinusPage: HttpException = new HttpException(
  ' page cannot be minus',
  400,
);
export const SizeError: HttpException = new HttpException(
  ' Size must be greater than 0',
  400,
);
