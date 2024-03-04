import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorEmptyPage,
  ErrorEmptySize,
  ErrorPostCreateFailed,
  ErrorPostDeleteFailed,
  ErrorPostNotFound,
  PostDomain,
  PostRepository,
  PostRespone,
  PostUseCase,
  SizeError,
} from '../../../../domain/post.domain';

@Injectable()
export class BaseUseCaseService implements PostUseCase {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepository,
  ) {}
  async getAllPost(): Promise<PostDomain[]> {
    return this.postRepository.getAllPost();
  }
  async getDetail(id: string): Promise<PostDomain> {
    if (id === '' || id === undefined || id === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getDetail(id);
  }
  async getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    if (mention === '' || mention === undefined || mention === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getByMentionId(mention, page, size);
  }
  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    if (creatorId === '' || creatorId === undefined || creatorId === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getAllByUid(creatorId, page, size);
  }
  getMine(id: string, page: number, size: number): Promise<PostRespone> {
    if (id === '' || id === undefined || id === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getMine(id, page, size);
  }
  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    if (size < 1) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page < 1 || isNaN(page)) {
      throw ErrorEmptyPage;
    } else {
      return this.postRepository.getByCateId(cateId, page, size);
    }
  }
  getShare(uid: string, page: number, size: number): Promise<PostRespone> {
    if (uid === '' || uid === undefined || uid === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getShare(uid, page, size);
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
