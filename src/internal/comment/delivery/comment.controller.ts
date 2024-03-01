import {
  Body,
  Controller,
  Inject,
  Post,
  Headers,
  Get,
  Query,
  Delete, Put,
} from '@nestjs/common';
import { CommentInterop } from '../../../domain/comment.domain';
import { Comment } from '../../../domain/comment.domain';

@Controller('v1/comment')
export class CommentController {
  constructor(@Inject('CommentInterop') private interop: CommentInterop) {}

  @Post()
  async createComment(@Headers() headers: any, @Body() comment: Comment) {
    let token = headers['authorization'];
    try {
      await this.interop.createComment(token, comment);
    } catch (e) {
      throw e;
    }
  }
  @Delete()
  async deleteComment(@Headers() headers: any,@Query('id') id: string) {
    let token = headers['authorization'];
    try {
      return await this.interop.deleteComment(token, id);
    } catch (e) {
      throw e;
    }
  }
  @Put()
  async updateComment(@Headers() headers: any, @Query('id') id: string, @Body() comment: Comment){
    let token = headers['authorization'];
    try {
      const updateRef =  await this.interop.updateComment(token, id, comment);
      return {
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
        authorId: comment.authorId,
        updateRef
      }
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getCommentById(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    console.log(id);
    try {
      return await this.interop.getCommentById(token, id);
    } catch (e) {
      throw e;
    }
  }
  @Get('/all')
  async getComments(@Headers() headers: any) {
    let token = headers['authorization'];
    try {
      return await this.interop.getComments(token);
    } catch (e) {
      throw e;
    }
  }
}
