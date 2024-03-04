import { Inject, Injectable } from '@nestjs/common';
import {
  PostDomain,
  PostInterop,
  PostRespone,
  PostUseCase,
} from '../../../../domain/post.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class BaseInteropService implements PostInterop {
  constructor(
    @Inject('PostUseCase') private useCase: PostUseCase,
    @Inject('AuthUseCase') private authUsecase: AuthUseCase,
  ) {}
  async getDetail(id: string, token: string): Promise<PostDomain> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getDetail(id);
    } catch (e) {
      throw e;
    }
  }
  async getByMentionId(
    mention: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByMentionId(mention, page, size);
    } catch (e) {
      throw e;
    }
  }
  async getMine(
    token: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      return this.useCase.getMine(idToken.uid, page, size);
    } catch (e) {
      throw e;
    }
  }
  async getAllByUid(
    token: string,
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllByUid(creatorId, page, size);
    } catch (e) {
      throw e;
    }
  }
  async getByCateId(
    cateId: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByCateId(cateId, page, size);
    } catch (e) {
      throw e;
    }
  }
  async getShare(
    uid: string,
    token: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getShare(uid, page, size);
    } catch (e) {
      throw e;
    }
  }
  async create(post: PostDomain, token: string): Promise<boolean> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      post.id = idToken.uid.slice(0, 10) + Date.now().toString();
      post.creatorId = idToken.uid;
      post.comments = [];
      post.reaction = [];
      return this.useCase.create(post);
    } catch (e) {
      throw e;
    }
  }
  async update(post: PostDomain, token: string): Promise<boolean> {
    try {
      const idToken = await this.authUsecase.verifyToken(token);
      post.creatorId = idToken.uid;
      return this.useCase.update(post);
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string, token: string): Promise<boolean> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.delete(id);
    } catch (e) {
      throw e;
    }
  }
  async getAllPost(token: string): Promise<PostDomain[]> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllPost();
    } catch (e) {
      throw e;
    }
  }
}
