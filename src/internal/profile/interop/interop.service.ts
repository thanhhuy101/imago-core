import { Inject, Injectable } from '@nestjs/common';
import { AuthUseCase } from 'src/domain/auth.domain';
import {
  Profile,
  ProfileInterop,
  ProfileUseCase,
} from 'src/domain/profile.domain';

@Injectable()
export class InteropService implements ProfileInterop {
  constructor(
    @Inject('ProfileUseCase') private profileUseCase: ProfileUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async getProfile(id: string, token: string): Promise<Profile> {
    try {
      await this.authUseCase.verifyToken(token);
      return await this.profileUseCase.getProfile(id);
    } catch (e) {
      throw e;
    }
  }
  async getMineProfile(token: string): Promise<Profile> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      return await this.profileUseCase.getProfile(decodedToken.uid);
    } catch (e) {
      throw e;
    }
  }
  async createProfile(profile: Profile, token: string): Promise<boolean> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      profile.id = decodedToken.uid;
      profile.email = decodedToken.email;
      return await this.profileUseCase.createProfile(profile);
    } catch (e) {
      throw e;
    }
  }
  async updateProfile(profile: Profile, token: string): Promise<boolean> {
    try {
      await this.authUseCase.verifyToken(token);
      return await this.profileUseCase.updateProfile(profile);
    } catch (e) {
      throw e;
    }
  }
  async follow(profile: Profile, token: string): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      // Cập nhật following của profile 1, nếu following[] của profile 1 không chứa id của profile 2 thì thêm id của profile 2 vào following[] của profile 1
      if (!profile.following.includes(profile.id)) {
        profile.following.push(profile.id);
        await this.profileUseCase.updateProfile(profile);
      }
      // Cập nhật followers của profile 2, nếu followers[] của profile 2 không chứa id của profile 1 thì thêm id của profile 1 vào followers[] của profile 2
      if (!profile.followers.includes(profile.id)) {
        profile.followers.push(profile.id);
        await this.profileUseCase.updateProfile(profile);
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }

  async unfollow(profile: Profile, token: string): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      // Cập nhật following của profile 1, nếu following[] của profile 1 chứa id của profile 2 thì xóa id của profile 2 khỏi following[] của profile 1 còn không following[] của profile 1 không thay đổi
      if (profile.following.includes(profile.id)) {
        profile.following = profile.following.filter((id) => id !== profile.id);
        await this.profileUseCase.updateProfile(profile);
      }
      // Cập nhật followers của profile 2, nếu followers[] của profile 2 chứa id của profile 1 thì xóa id của profile 1 khỏi followers[] của profile 2 còn không chứa thì followers[] của profile 2 không thay đổi
      if (profile.followers.includes(profile.id)) {
        profile.followers = profile.followers.filter((id) => id !== profile.id);
        await this.profileUseCase.updateProfile(profile);
      }
      return profile;
    } catch (error) {
      throw error;
    }
  }
}
