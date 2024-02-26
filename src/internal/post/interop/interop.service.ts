import { Inject, Injectable } from '@nestjs/common';
import { PostDomain, PostInterop, PostUseCase } from 'src/domain/post.domain';

@Injectable()
export class InteropService implements PostInterop {
  constructor(@Inject('PostUseCase') private useCase: PostUseCase) {}
  async getPost(id: string): Promise<PostDomain> {
    try {
      return this.useCase.getPost(id);
    } catch (e) {
      throw e;
    }
  }
  getPostsByUid(creatorId: string): Promise<PostDomain[]> {
    try {
      return this.useCase.getPostsByUid(creatorId);
    } catch (e) {
      throw e;
    }
  }
  getPostsByCateId(cateId: string): Promise<PostDomain[]> {
    try {
      return this.useCase.getPostsByCateId(cateId);
    } catch (e) {
      throw e;
    }
  }
  getSharedPost(uid: string): Promise<PostDomain[]> {
    try {
      return this.useCase.getSharedPost(uid);
    } catch (e) {
      throw e;
    }
  }
  createPost(post: PostDomain): Promise<boolean> {
    try {
      return this.useCase.createPost(post);
    } catch (e) {
      throw e;
    }
  }
  updatePost(post: PostDomain): Promise<boolean> {
    try {
      return this.useCase.updatePost(post);
    } catch (e) {
      throw e;
    }
  }
  deletePost(id: string): Promise<boolean> {
    try {
      return this.useCase.deletePost(id);
    } catch (e) {
      throw e;
    }
  }
}
