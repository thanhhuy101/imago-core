import { Injectable } from '@nestjs/common';
import {
  ErrorProfileNotFound,
  Profile,
  ProfileRepository,
} from 'src/domain/profile.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class RepositoryService implements ProfileRepository {
  db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async getProfile(id: string): Promise<Profile> {
    try {
      const profile = await this.db.collection('profiles').doc(id).get();
      if (!profile.exists) {
        throw ErrorProfileNotFound;
      } else {
        return profile.data() as Profile;
      }
    } catch (error) {
      throw error;
    }
  }

  async createProfile(profile: Profile): Promise<boolean> {
    try {
      await this.db.collection('profiles').doc(profile.id).set(profile);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(profile: Profile): Promise<boolean> {
    try {
      await this.db.collection('profiles').doc(profile.id).set(profile);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
