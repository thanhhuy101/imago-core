import {
  ErrorPostCreateFailed,
  ErrorPostDeleteFailed,
  ErrorPostNotFound,
  PostRepository,
} from './../../../domain/post.domain';
import { Inject, Injectable } from '@nestjs/common';
import { PostDomain, PostUseCase } from 'src/domain/post.domain';

@Injectable()
export class UsecaseService implements PostUseCase {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepository,
  ) {}
  async getPost(id: string): Promise<PostDomain> {
    if (id === '' || id === undefined || id === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getPost(id);
  }
  getPostsByUid(creatorId: string): Promise<PostDomain[]> {
    if (creatorId === '' || creatorId === undefined || creatorId === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getPostsByUid(creatorId);
  }
  getPostsByCateId(cateId: string): Promise<PostDomain[]> {
    return this.postRepository.getPostsByCateId(cateId);
  }
  getSharedPost(uid: string): Promise<PostDomain[]> {
    if (uid === '' || uid === undefined || uid === null) {
      throw ErrorPostNotFound;
    }
    return this.postRepository.getSharedPost(uid);
  }
  createPost(post: PostDomain): Promise<boolean> {
    if (
      post.photoUrl.length === 0 ||
      post.photoUrl === undefined ||
      post.photoUrl === null
    ) {
      console.error(ErrorPostCreateFailed);
    }
    return this.postRepository.createPost(post);
  }
  updatePost(post: PostDomain): Promise<boolean> {
    return this.postRepository.updatePost(post);
  }
  async deletePost(id: string): Promise<boolean> {
    let existed = await this.postRepository.getPost(id);
    if (!existed) {
      console.error(ErrorPostDeleteFailed);
    }
    return this.postRepository.deletePost(id);
  }
}
