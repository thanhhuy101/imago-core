import { Inject, Injectable } from '@nestjs/common';
import {
  AllPosts,
  ErrorEmptyPage, ErrorEmptyPageData,
  ErrorEmptySize, ErrorMinusPage,
  ErrorPostCreateFailed,
  ErrorPostDeleteFailed,
  ErrorPostNotFound, PageError,
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

  async getPostById(id: string): Promise<PostDomain> {
    if(id === '' || id === null || id === undefined){
      throw ErrorPostNotFound;
    }
    return await this.postRepository.getPostById(id);
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
    let endpage: number;
    const postRef = await this.postRepository.getByMentionId(mention, page, size);
    endpage = postRef.endpage;
    if (mention === '' || mention === undefined || mention === null) {
      throw ErrorPostNotFound;
    }
    if(page > endpage){
      throw ErrorEmptyPageData;
    }
    return this.postRepository.getByMentionId(mention, page, size);
  }
  async getAllPost(
    page: number,
  ): Promise<AllPosts> {
    let endpage: number;
    const postRef = await this.postRepository.getAllPost(page);
    endpage = postRef.endpage;
    if (page < 1) {
      throw PageError;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    }
    else if (page > endpage){
      throw ErrorEmptyPageData;
    }
    else {
      return this.postRepository.getAllPost(page);
    }
  }
async  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    let endpage: number;
    const postRef = await this.postRepository.getAllByUid(creatorId, page, size);
    endpage = postRef.endpage;
    if (creatorId === '' || creatorId === undefined || creatorId === null) {
      throw ErrorPostNotFound;
    }
    if(page > endpage){
      throw ErrorEmptyPageData;
    }
    return this.postRepository.getAllByUid(creatorId, page, size);
  }
 async getMine(id: string, page: number, size: number): Promise<PostRespone> {
    let endpage: number;
    const postRef = await this.postRepository.getMine(id, page, size);
    endpage = postRef.endpage;
    if (id === '' || id === undefined || id === null) {
      throw ErrorPostNotFound;
    }
    if(page > endpage){
      throw ErrorEmptyPageData;
    }
    return this.postRepository.getMine(id, page, size);
  }
 async getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostRespone> {
    let endpage: number;
    const postRef = await this.postRepository.getByCateId(cateId, page, size);
    endpage = postRef.endpage;
    if (size < 1) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page < 1 || isNaN(page)) {
      throw ErrorEmptyPage;
    }else if (page > endpage){
      throw ErrorEmptyPageData;
    }
    else {
      return this.postRepository.getByCateId(cateId, page, size);
    }
  }
 async getShare(uid: string, page: number, size: number): Promise<PostRespone> {
    let endpage: number;
    const postRef = await this.postRepository.getShare(uid, page, size);
    endpage = postRef.endpage;
    if (uid === '' || uid === undefined || uid === null) {
      throw ErrorPostNotFound;
    }
    if(page > endpage){
      throw ErrorEmptyPageData;
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
