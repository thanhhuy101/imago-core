import { Inject, Injectable } from '@nestjs/common';
import {
  ErrFirstName,
  ErrLastName,
  ErrPhone,
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
    if (
      profile.firstName === '' ||
      profile.firstName === null ||
      typeof profile.firstName === 'number'
    ) {
      throw ErrFirstName;
    }
    if (
      profile.lastName === '' ||
      profile.lastName === null ||
      typeof profile.lastName === 'number'
    ) {
      throw ErrLastName;
    }

    return await this.profileRepository.createProfile(profile);
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    if (
      profile.firstName === '' ||
      profile.firstName === null ||
      typeof profile.firstName === 'number'
    ) {
      throw ErrFirstName;
    }
    if (
      profile.lastName === '' ||
      profile.lastName === null ||
      typeof profile.lastName === 'number'
    ) {
      throw ErrLastName;
    }
    //check if phone is null or is string then throw error
    if (profile.phone === '') {
      throw ErrPhone;
    }
    return await this.profileRepository.updateProfile(profile);
  }
}
