import { Inject, Injectable } from '@nestjs/common';
import { PostDomain, PostInterop, PostUseCase } from '../../../../domain/post.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class BaseInteropService  implements PostInterop {
  constructor(@Inject('PostUseCase') private useCase: PostUseCase,@Inject('AuthUseCase') private authUsecase: AuthUseCase) {}
  async getDetail(id: string,token: string): Promise<PostDomain> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getDetail(id);
    } catch (e) {
      throw e;
    }
  }
  async getByMentionId(mention: string,token:string): Promise<PostDomain[]> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByMentionId(mention);
    } catch (e) {
      throw e;
    }
  }
  async getAllByUid(creatorId: string,token:string): Promise<PostDomain[]> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getAllByUid(creatorId);
    } catch (e) {
      throw e;
    }
  }
  async getByCateId(cateId: string,token:string): Promise<PostDomain[]> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getByCateId(cateId);
    } catch (e) {
      throw e;
    }
  }
  async getShare(uid: string,token:string): Promise<PostDomain[]> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.getShare(uid);
    } catch (e) {
      throw e;
    }
  }
  async create(post: PostDomain,token:string): Promise<boolean> {
    try {
      post.comments = [];
      post.reaction = [];
      await this.authUsecase.verifyToken(token);
      return this.useCase.create(post);
    } catch (e) {
      throw e;
    }
  }
  async update(post: PostDomain,token: string): Promise<boolean> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.update(post);
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string,token: string): Promise<boolean> {
    try {
      await this.authUsecase.verifyToken(token);
      return this.useCase.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
