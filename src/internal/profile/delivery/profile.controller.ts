import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import { Profile, ProfileInterop } from 'src/domain/profile.domain';

@Controller('v2/profile')
export class ProfileController {
  constructor(
    @Inject('ProfileInterop') private profileInterop: ProfileInterop,
  ) {}

  @Get('')
  get(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.profileInterop.get(id, token);
  }

  @Get('adminuser')
  getAllAuthProfile(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    return this.profileInterop.getAllAuthProfile(token, page, size);
  }

  @Get('adminuser/noprofile')
  getAllAuthNoProfile(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    return this.profileInterop.getAllAuthNoProfile(token, page, size);
  }

  @Get('mine')
  getMine(@Headers() headers: any) {
    let token = headers['authorization'];
    return this.profileInterop.getMine(token);
  }

  @Get('list')
  getAll(@Headers() headers: any) {
    let token = headers['authorization'];
    return this.profileInterop.getAll(token);
  }

  @Post('')
  async create(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return await this.profileInterop.create(profile, token);
  }

  @Post('mine')
  createMine(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.create(profile, token);
  }

  @Put('')
  update(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.update(profile, token);
  }

  @Put('mine')
  updateMine(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.update(profile, token);
  }

  @Put('follow')
  follow(
    @Headers() headers: any,
    @Query('profileId') profileId: string,
    @Query('otherProfileId') otherProfileId: string,
  ) {
    let token = headers['authorization'];
    return this.profileInterop.follow(token, profileId, otherProfileId);
  }

  @Put('unfollow')
  unfollow(
    @Headers() headers: any,
    @Query('profileId') profileId: string,
    @Query('otherProfileId') otherProfileId: string,
  ) {
    let token = headers['authorization'];
    return this.profileInterop.unfollow(token, profileId, otherProfileId);
  }

  @Get('search')
  search(@Query('query') query: string) {
    try {
      return this.profileInterop.search('profiles', query);
    } catch (e) {
      throw e;
    }
  }

  //get all except mine
  @Get('listexceptmine')
  getAllExceptMine(@Headers() headers: any) {
    let token = headers['authorization'];
    return this.profileInterop.getAllExceptMine(token);
  }
}
