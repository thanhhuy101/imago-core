import { Inject, Injectable } from '@nestjs/common';
import {

  ErrTagExisted,
  Hashtag,
  HashtagInterop,
  HashtagUseCase,
} from '../../../domain/hashtag.domain';

@Injectable()
export class InteropService implements HashtagInterop{
  constructor(@Inject('HashtagUseCase')private hashtagUseCase: HashtagUseCase){
  }

  async create(tag: Hashtag): Promise<Hashtag> {
    try {
      if (!tag.tag || tag.tag.trim() === '') {
        throw new Error('Tag is required');
      }

      // Kiểm tra xem tag đã tồn tại trong cơ sở dữ liệu chưa
      const existingTag = await this.hashtagUseCase.get(tag.tag);
      if (existingTag) {
        throw ErrTagExisted;
      }

      return await this.hashtagUseCase.create(tag);
    } catch (e) {
      throw e;
    }
  }

  // @ts-ignore
  async get(tag: string,token: String): Promise<Hashtag> {
    try {
      return await this.hashtagUseCase.get(tag);
    }
    catch (e){
      throw e;
  }}

  async list(): Promise<Hashtag[]> {
    try {
      return await this.hashtagUseCase.list();
    }
    catch (e){
      throw e;
    }
  }

  async update(tag: Hashtag): Promise<Hashtag> {
    try {
      return await this.hashtagUseCase.update(tag);
    }
    catch (e){
      throw e;
    }
  }

}
