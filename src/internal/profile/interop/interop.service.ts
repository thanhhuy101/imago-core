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
  async follow(token: string, uid: string, id: string): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.getProfile(uid);
      let otherProfile = await this.profileUseCase.getProfile(id);
      if (profile) {
        if (this.isExisted(profile.following, id) || uid === id) {
          return false;
        } 
        if (
          !profile.following === undefined ||
          profile.following.length === 0 ||
          !this.isExisted(profile.following, id)
        ) {
          if (
            !otherProfile.followers === undefined ||
            otherProfile.followers.length === 0 ||
            otherProfile.followers.includes(uid) ||
            profile.followers.includes(id)
          ) {
            profile.following.push(id);
            otherProfile.followers.push(uid);
            await this.profileUseCase.updateProfile(profile);
            await this.profileUseCase.updateProfile(otherProfile);
          }
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async unfollow(token: string, uid: string, id: string): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.getProfile(uid);
      let otherProfile = await this.profileUseCase.getProfile(id);
      if (profile) {
        if (this.isExisted(profile.following, id)) {
          if (otherProfile.followers.includes(uid)) {
            profile.following = profile.following.filter((item) => item !== id);
            otherProfile.followers = otherProfile.followers.filter(
              (item) => item !== uid,
            );
            await this.profileUseCase.updateProfile(profile);
            await this.profileUseCase.updateProfile(otherProfile);
          }
        }
        if (!this.isExisted(profile.following, id)) {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  isExisted(checkArray: string[], id: string): Boolean {
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === id) {
        return true;
      }
    }
    return false;
  }
}
