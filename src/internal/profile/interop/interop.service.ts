import { Inject, Injectable } from '@nestjs/common';
import {
  Profile,
  ProfileInterop,
  ProfileUseCase,
} from 'src/domain/profile.domain';

@Injectable()
export class InteropService implements ProfileInterop {
  constructor(
    @Inject('ProfileUseCase') private profileUseCase: ProfileUseCase,
  ) {}

  async getProfile(id: string): Promise<Profile> {
    try {
      return await this.profileUseCase.getProfile(id);
    } catch (e) {
      throw e;
    }
  }
  async createProfile(profile: Profile): Promise<boolean> {
    try {
      return await this.profileUseCase.createProfile(profile);
    } catch (e) {
      throw e;
    }
  }
  async updateProfile(profile: Profile): Promise<boolean> {
    try {
      return await this.profileUseCase.updateProfile(profile);
    } catch (e) {
      throw e;
    }
  }
}
