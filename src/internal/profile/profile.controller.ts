import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Profile, ProfileInterop } from 'src/domain/profile.domain';

@Controller('v1/profile')
export class ProfileController {
  constructor(
    @Inject('ProfileInterop') private profileInterop: ProfileInterop,
  ) {}

  @Get('get')
  getProfile(@Query('id') id: string) {
    return this.profileInterop.getProfile(id);
  }

  @Get('getMine')
  getMineProfile(@Query('id') id: string) {
    return this.profileInterop.getProfile(id);
  }

  @Post('create')
  createProfile(@Body() profile: Profile) {
    return this.profileInterop.createProfile(profile);
  }

  @Post('createMine')
  createMineProfile(@Body() profile: Profile) {
    return this.profileInterop.createProfile(profile);
  }

  @Put('update')
  updateProfile(@Body() profile: Profile) {
    return this.profileInterop.updateProfile(profile);
  }

  @Put('updateMine')
  updateMineProfile(@Body() profile: Profile) {
    return this.profileInterop.updateProfile(profile);
  }

  @Put('follow')
  updateFollow(@Body() profile: Profile) {
    return this.profileInterop.updateProfile(profile);
  }
  @Put('unfollow')
  updateUnfollow(@Body() profile: Profile) {
    return this.profileInterop.updateProfile(profile);
  }
}
