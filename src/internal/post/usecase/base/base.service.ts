import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorContentInvalid,
  ErrorEmptyPage,
  ErrorEmptySize, ErrorInvalidPostBody, ErrorMinusPage, ErrorPageIsNaN, ErrorPhotoInvalid,
  ErrorPostCreateFailed,
  ErrorPostDeleteFailed, ErrorPostIdInvalid,
  ErrorPostNotFound,
  PostDomain,
  PostRepository,
  PostResponse,
  PostUseCase,
  SizeError,
} from '../../../../domain/post.domain';
import { isNumber } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class BaseUseCaseService implements PostUseCase {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepository,
  ) {}

  async getPostById(id: string): Promise<PostDomain> {
    return await this.postRepository.getPostById(id);
  }

  async getAllPost(): Promise<PostDomain[]> {
    return this.postRepository.getAllPost();
  }

  async getDetail(id: string): Promise<PostDomain> {
    if (!id || id.trim() === '') {
      throw ErrorPostIdInvalid;
    }
    const postDetail = await this.postRepository.getDetail(id);

    if (!postDetail) {
      throw ErrorPostNotFound;
    }

    return postDetail;
  }

  async getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null){
      throw ErrorEmptyPage;
    }else if(isNaN(page)){
      throw ErrorPageIsNaN
    }else if(page <= 0 ){
      throw ErrorMinusPage;
    }
    else {
      return this.postRepository.getByMentionId(mention, page, size);
    }
  }

  getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null){
      throw ErrorEmptyPage;
    }else if(isNaN(page)){
      throw ErrorPageIsNaN
    }else if(page <= 0 ){
      throw ErrorMinusPage;
    }
    else {
      return this.postRepository.getAllByUid(creatorId, page, size);
    }
  }
  getMine(id: string, page: number, size: number): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null){
      throw ErrorEmptyPage;
    }else if(isNaN(page)){
      throw ErrorPageIsNaN
    }else if(page <= 0 ){
      throw ErrorMinusPage;
    }
    else {
      return this.postRepository.getMine(id, page, size);
    }
  }

  getByCateId(
    cateId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null ){
      throw ErrorEmptyPage;

    }else if(isNaN(page)){
     throw ErrorPageIsNaN
    }
    else if(page <= 0 ){
      throw ErrorMinusPage;
    }
    else {
      return this.postRepository.getByCateId(cateId, page, size);
    }
  }
  getShare(shareId: string, page: number, size: number): Promise<PostResponse> {
    if (size <= 0) {
      throw SizeError;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else if (page === undefined || page === null){
      throw ErrorEmptyPage;
    }else if(isNaN(page)){
      throw ErrorPageIsNaN
    }else if(page <= 0 ){
      throw ErrorMinusPage;
    }
    else {
    return this.postRepository.getShare(shareId, page, size);
    }
  }

  create(post: PostDomain): Promise<boolean> {
    if (
      post.photoUrl.length === 0 ||
      post.photoUrl === undefined ||
      post.photoUrl === null||
      post.photoUrl.values().next().value === ''||
      isNumber(post.photoUrl.values().next().value)
    ){
     throw ErrorPhotoInvalid;
    }
    if(post.content === '' || post.content === undefined || post.content === null) {
      throw ErrorContentInvalid;
    }
    return this.postRepository.create(post);
  }

  update(post: PostDomain): Promise<boolean> {
    if (
      post.photoUrl.length === 0 ||
      post.photoUrl === undefined ||
      post.photoUrl === null ||
      post.photoUrl.values().next().value === ''||
      isNumber(post.photoUrl.values().next().value)
    ){
      throw ErrorPhotoInvalid;
    }
    if(post.content === '' || post.content === undefined || post.content === null) {
      throw ErrorContentInvalid;
    }
    return this.postRepository.update(post);
  }

  async delete(id: string): Promise<boolean> {
    const existed = await this.postRepository.getDetail(id);
    if (!existed) {
     throw ErrorPostDeleteFailed
    }
    return this.postRepository.delete(id);
  }
}
