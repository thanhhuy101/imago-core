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

  async get(id: string): Promise<Profile> {
    return await this.db
      .collection('profile')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Profile;
        } else {
          throw ErrorProfileNotFound;
        }
      });
  }

  async getAll(): Promise<Profile[]> {
    return await this.db
      .collection('profile')
      .get()
      .then((snapshot) => {
        let result: Profile[] = [];
        snapshot.forEach((doc) => {
          result.push(doc.data() as Profile);
        });
        return result;
      });
  }

  async create(profile: Profile): Promise<boolean> {
    await this.db.collection('profile').doc(profile.id).set(profile);
    return true;
  }

  async update(profile: Profile): Promise<boolean> {
    await this.db
      .collection('profile')
      .doc(profile.id)
      .update({ ...profile });
    return true;
  }
}
