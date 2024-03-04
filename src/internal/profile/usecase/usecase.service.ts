import { Inject, Injectable } from '@nestjs/common';
import {
  ErrFirstName,
  ErrLastName,
  ErrPhone,
  ErrUserName,
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
    try {
      if (profile.userName === '') {
        throw ErrUserName;
      }
      if (profile.firstName === '' || typeof profile.firstName === 'number') {
        throw ErrFirstName;
      }
      if (profile.lastName === '' || typeof profile.lastName === 'number') {
        throw ErrLastName;
      }

      return await this.profileRepository.createProfile(profile);
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    try {
      if (profile.userName === '') {
        throw ErrUserName;
      }
      if (profile.firstName === '' || typeof profile.firstName === 'number') {
        throw ErrFirstName;
      }
      if (profile.lastName === '' || typeof profile.lastName === 'number') {
        throw ErrLastName;
      }
      if (profile.phone === '') {
        throw ErrPhone;
      }
      return await this.profileRepository.updateProfile(profile);
    } catch (error) {
      throw error;
    }
  }
}
