export interface Profile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoUrl: string;
  followers: string[];
  following: string[];
  phone: string;
  gender: string;
  categrories: string[];
}

export interface ProfileRepository {
  getProfile(id: string): Promise<Profile>;
  createProfile(profile: Profile): Promise<boolean>;
  updateProfile(profile: Profile): Promise<boolean>;
}

export interface ProfileUseCase {
  getProfile(id: string): Promise<Profile>;
  createProfile(profile: Profile): Promise<boolean>;
  updateProfile(profile: Profile): Promise<boolean>;
}

export interface ProfileInterop {
  getProfile(id: string): Promise<Profile>;
  createProfile(profile: Profile): Promise<boolean>;
  updateProfile(profile: Profile): Promise<boolean>;
}

export const ErrorProfileNotFound = 'Profile not found';
export const ErrorProfileCreateFailed = 'Profile create failed';
export const ErrorProfileUpdateFailed = 'Profile update failed';
export const ErrUserName =
  'Username is required and must be a non-empty string';
export const ErrFirstName =
  'First name is required is string and must not be a empty string or number';
export const ErrLastName =
  'Last name is required is string and must not be a empty string or number';
export const ErrPhone =
  'A phone number is required is number and must not be a empty string or string';
