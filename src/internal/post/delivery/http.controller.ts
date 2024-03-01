import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { PostDomain, PostInterop } from 'src/domain/post.domain';
import any = jasmine.any;

@Controller('v1/post')
export class HttpController {
  constructor(@Inject('PostInterop') private interop: PostInterop) {}
  @Get()
  async getPosts(@Headers() headers:any,@Query('id') id: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getDetail(id,token);
    } catch (e) {
      throw e;
    }
  }

  @Get('mention')
  async getMention(@Headers() headers:any,@Query('mention') mention: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getByMentionId(mention,token);
    } catch (e) {
      throw e;
    }
  }

  @Get('mine')
  async getPostsByUid(@Headers() headers:any,@Query('creatorId') creatorId: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getAllByUid(creatorId,token);
    } catch (e) {
      throw e;
    }
  }
  @Get('category')
  async getPostsByCateId(@Headers() headers:any,@Query('cateId') cateId: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getByCateId(cateId,token);
    } catch (e) {
      throw e;
    }
  }
  @Get('share')
  async getSharedPost(@Headers() headers:any,@Query('uid') uid: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.getShare(uid,token);
    } catch (e) {
      throw e;
    }
  }
  @Post()
  async createPost(@Headers() headers:any,@Body() post: PostDomain) {
    let token = headers['authorization'];
    try {
      return await this.interop.create(post,token);
    } catch (e) {
      throw e;
    }
  }
  @Put()
  async updatePost(@Headers() headers:any,@Body() post: PostDomain) {
    let token = headers['authorization'];
    try {
      return await this.interop.update(post,token);
    } catch (e) {
      throw e;
    }
  }
  @Delete()
  async deletePost(@Headers() headers:any,@Query('id') id: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.delete(id,token);
    } catch (e) {
      throw e;
    }
  }
}
