import { Inject, Injectable } from '@nestjs/common';
import { Hashtag, HashtagRepository, HashtagUseCase } from '../../../domain/hashtag.domain';

@Injectable()
export class UsecaseService implements HashtagUseCase {
  constructor(@Inject('HashtagRepository') private repository: HashtagRepository) {
  }

  async get(tag: string): Promise<Hashtag> {
    return await this.repository.get(tag);
    }
    async create(tag: Hashtag): Promise<Hashtag> {
        return await this.repository.create(tag);
    }
   async update(tag: Hashtag): Promise<Hashtag> {

    return await this.repository.update(tag);
    }
   async list(): Promise<Hashtag[]> {
    return await this.repository.list();
    }
}
