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

@Controller('v1/profile')
export class ProfileController {
  constructor(
    @Inject('ProfileInterop') private profileInterop: ProfileInterop,
  ) {}

  @Get('get')
  getProfile(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.profileInterop.getProfile(id, token);
  }

  @Get('getMine')
  getMineProfile(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.profileInterop.getProfile(id, token);
  }

  @Post('create')
  createProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.createProfile(profile, token);
  }

  @Post('createMine')
  createMineProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.createProfile(profile, token);
  }

  @Put('update')
  updateProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.updateProfile(profile, token);
  }

  @Put('updateMine')
  updateMineProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.updateProfile(profile, token);
  }

  @Put('follow')
  updateFollow(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.follow(profile, token);
  }
  @Put('unfollow')
  updateUnfollow(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.unfollow(profile, token);
  }
}
