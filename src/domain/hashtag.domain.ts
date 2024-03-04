import { HttpException } from '@nestjs/common';

export interface Hashtag {
  tag: string;
  postId: string;
}
export interface HashtagRepository {
  get(tag: string): Promise<Hashtag>;
  create(tag: Hashtag): Promise<Hashtag>;
  update(tag: Hashtag): Promise<Hashtag>;
  list(): Promise<Hashtag[]>;
}
export interface HashtagUseCase {
  get(tag: string): Promise<Hashtag>;
  create(tag: Hashtag): Promise<Hashtag>;
  update(tag: Hashtag): Promise<Hashtag>;
  list(): Promise<Hashtag[]>;
}
export interface HashtagInterop {
  get(tag: string,token: string): Promise<Hashtag>;
  create(tag: Hashtag,token: string): Promise<Hashtag>;
  update(tag: Hashtag,token: string): Promise<Hashtag>;
  list(token: string): Promise<Hashtag[]>;
}
export const ErrTagExisted: HttpException = new HttpException(
  'tag existed',
  400,)