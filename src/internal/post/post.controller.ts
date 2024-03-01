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
  @Get('detail')
  async getPosts(@Query('id') id: string) {
    try {
      return await this.interop.getPost(id);
    } catch (e) {
      throw e;
    }
  }
  @Get('mine')
  async getPostsByUid(@Query('uid') creatorId: string) {
    try {
      return await this.interop.getPostsByUid(creatorId);
    } catch (e) {
      throw e;
    }
  }
  @Get('category')
  async getPostsByCateId(@Query('category') cateId: string) {
    try {
      return await this.interop.getPostsByCateId(cateId);
    } catch (e) {
      throw e;
    }
  }
  @Get('shared')
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
