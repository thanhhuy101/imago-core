import { Inject, Injectable } from '@nestjs/common';
import {
  ErrFirstName,
  ErrLastName,
  ErrorProfileNotFound,
  Profile,
  ProfileRepository,
  ProfileUseCase,
} from 'src/domain/profile.domain';

@Injectable()
export class UsecaseService implements ProfileUseCase {
  constructor(
    @Inject('ProfileRepository') private profileRepository: ProfileRepository,
  ) {}

  async getProfile(id: string): Promise<Profile> {
    return this.profileRepository.getProfile(id);
  }
  async createProfile(profile: Profile): Promise<boolean> {
    if (profile.firstName === '') {
      throw ErrFirstName;
    }
    if (profile.lastName === '') {
      throw ErrLastName;
    }

    return await this.profileRepository.createProfile(profile);
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    if (profile.firstName === '') {
      throw ErrFirstName;
    }
    if (profile.lastName === '') {
      throw ErrLastName;
    }

    return await this.profileRepository.updateProfile(profile);
  }
}
