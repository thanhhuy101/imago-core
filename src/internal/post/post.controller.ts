import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostDomain, PostInterop } from 'src/domain/post.domain';

@Controller('v1/post')
export class PostController {
  constructor(@Inject('PostInterop') private interop: PostInterop) {}
  @Get()
  async getPosts(@Query('id') id: string) {
    try {
      return await this.interop.getPost(id);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getPostsByUid(@Query('creatorId') creatorId: string) {
    try {
      return await this.interop.getPostsByUid(creatorId);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getPostsByCateId(@Query('cateId') cateId: string) {
    try {
      return await this.interop.getPostsByCateId(cateId);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getSharedPost(@Query('uid') uid: string) {
    try {
      return await this.interop.getSharedPost(uid);
    } catch (e) {
      throw e;
    }
  }
  @Post()
  async createPost(@Body() post: PostDomain) {
    try {
      return await this.interop.createPost(post);
    } catch (e) {
      throw e;
    }
  }
  @Put()
  async updatePost(@Body() post: PostDomain) {
    try {
      return await this.interop.updatePost(post);
    } catch (e) {
      throw e;
    }
  }
  @Delete()
  async deletePost(@Query('id') id: string) {
    try {
      return await this.interop.deletePost(id);
    } catch (e) {
      throw e;
    }
  }
}
