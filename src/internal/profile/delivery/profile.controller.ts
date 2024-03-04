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

  @Get('')
  getProfile(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.profileInterop.getProfile(id, token);
  }

  @Get('mine')
  getMineProfile(@Headers() headers: any) {
    let token = headers['authorization'];
    return this.profileInterop.getMineProfile(token);
  }

  @Post('')
  createProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.createProfile(profile, token);
  }

  @Post('mine')
  createMineProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.createProfile(profile, token);
  }

  @Put('')
  updateProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.updateProfile(profile, token);
  }

  @Put('mine')
  updateMineProfile(@Headers() headers: any, @Body() profile: Profile) {
    let token = headers['authorization'];
    return this.profileInterop.updateProfile(profile, token);
  }

  @Put('follow')
  updateFollow(@Headers() headers: any,@Query('uid') uid: string , @Query('id') id: string){
    let token = headers['authorization'];
    return this.profileInterop.follow(token, uid, id);
  }
  @Put('unfollow')
  updateUnfollow(@Headers() headers: any, @Query('uid') uid: string , @Query('id') id: string){
    let token = headers['authorization'];
    return this.profileInterop.unfollow(token, uid, id);
  }
}
