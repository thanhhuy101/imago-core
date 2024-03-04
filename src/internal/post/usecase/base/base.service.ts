import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorPostCreateFailed,
  ErrorPostDeleteFailed,
  ErrorPostNotFound,
  PostDomain,
  PostRepository,
  PostUseCase,
} from '../../../../domain/post.domain';

@Injectable()
export class BaseUseCaseService implements PostUseCase {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepository,
  ) {}
  async getDetail(id: string): Promise<PostDomain> {
    if (id === '' || id === undefined || id === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getDetail(id);
  }
  async getByMentionId(mention: string): Promise<PostDomain[]> {
    if (mention === '' || mention === undefined || mention === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getByMentionId(mention);
  }
  getAllByUid(creatorId: string): Promise<PostDomain[]> {
    if (creatorId === '' || creatorId === undefined || creatorId === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getAllByUid(creatorId);
  }
  getByCateId(cateId: string): Promise<PostDomain[]> {
    return this.postRepository.getByCateId(cateId);
  }
  getShare(uid: string): Promise<PostDomain[]> {
    if (uid === '' || uid === undefined || uid === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getShare(uid);
  }
  create(post: PostDomain): Promise<boolean> {
    if (
      post.photoUrl.length === 0 ||
      post.photoUrl === undefined ||
      post.photoUrl === null
    ) {
      console.error(ErrorPostCreateFailed);
    }
    return this.postRepository.create(post);
  }
  update(post: PostDomain): Promise<boolean> {
    return this.postRepository.update(post);
  }
  async delete(id: string): Promise<boolean> {
    let existed = await this.postRepository.getDetail(id);
    if (!existed) {
      console.error(ErrorPostDeleteFailed);
    }
    return this.postRepository.delete(id);
  }
}
