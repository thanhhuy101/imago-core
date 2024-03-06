export interface Profile {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  photoUrl: string;
  followers: string[];
  following: string[];
  phone: string;
  gender: string;
  category: string[];
  email: string;
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
  getProfile(id: string, token: string): Promise<Profile>;
  getMineProfile(token: string): Promise<Profile>;
  createProfile(profile: Profile, token: string): Promise<boolean>;
  createMineProfile(profile: Profile, token: string): Promise<boolean>;
  updateProfile(profile: Profile, token: string): Promise<boolean>;
  follow(token: string, uid: string, id: string): Promise<any>;
  unfollow(token: string, uid: string, id: string): Promise<any>;
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
  'A phone number is required and must be a non-empty string';
