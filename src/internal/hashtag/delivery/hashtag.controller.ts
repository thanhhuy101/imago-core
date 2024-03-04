import { Body, Controller, Get, Headers, Inject, Post, Put, Query } from '@nestjs/common';
import { Hashtag, HashtagInterop } from '../../../domain/hashtag.domain';
import { AuthDomain } from '../../../domain/auth.domain';

@Controller('v1/hashtag')
export class HashtagController {

  constructor(@Inject('HashtagInterop')private hashtagInterop: HashtagInterop) {}


  @Get('hashtags')
  getHashtagsByTag(@Headers() headers:any, @Query('tag') query:any) {
    let token = headers['authorization'];
    return this.hashtagInterop.get(query, token);
  }
  @Post('create')
  create(@Headers() headers:any,@Body() tag:Hashtag) {
    let token = headers['authorization'];
    return this.hashtagInterop.create(tag, token);

  }
@Put('update')
  update(@Headers() headers:any,@Body() tag:Hashtag) {
    let token = headers['authorization'];
    return this.hashtagInterop.update(tag, token);
  }
  @Get('list')
  list(@Headers() headers:any,@Body() tag:Hashtag) {
    let token = headers['authorization'];
    return this.hashtagInterop.list( token);
  }


}

