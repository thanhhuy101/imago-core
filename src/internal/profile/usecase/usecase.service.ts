import { Inject, Injectable } from '@nestjs/common';
import {
  ErrFirstName,
  ErrLastName,
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
    if (id === '' || id === undefined || id === null) {
      throw ErrorProfileNotFound;
    }
    return this.profileRepository.getProfile(id);
  }
  async createProfile(profile: Profile): Promise<boolean> {
    function isValidString(value: string | undefined | null): boolean {
      return typeof value === 'string' && value.trim() !== '';
    }

    if (!isValidString(profile.username)) {
      throw ErrUserName;
    }
    if (!isValidString(profile.firstName)) {
      throw ErrFirstName;
    }
    if (!isValidString(profile.lastName)) {
      throw ErrLastName;
    }

    return await this.profileRepository.createProfile(profile);
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    function isValidString(value: string | undefined | null): boolean {
      return typeof value === 'string' && value.trim() !== '';
    }

    if (!isValidString(profile.username)) {
      throw ErrUserName;
    }
    if (!isValidString(profile.firstName)) {
      throw ErrFirstName;
    }
    if (!isValidString(profile.lastName)) {
      throw ErrLastName;
    }

    return await this.profileRepository.updateProfile(profile);
  }
}
