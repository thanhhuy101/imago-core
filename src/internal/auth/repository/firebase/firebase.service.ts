import { Injectable } from '@nestjs/common';
import * as assmin from 'firebase-admin';
import {
  Auth,
  AuthRepository,
  ErrorAccountNotFound,
  ErrorInvalidToken,
  ErrorUnauthorized,
} from '../../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements AuthRepository {
  auth: assmin.auth.Auth;
  db = admin.firestore();

  constructor() {
    this.auth = assmin.auth();
  }

  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken = await this.auth.verifyIdToken(token);

      if (!decodedToken) {
        throw ErrorInvalidToken;
      }
      return decodedToken;
    } catch (error) {
      throw ErrorUnauthorized;
    }
  }

  async create(account: Auth): Promise<FirebaseFirestore.WriteResult> {
    return await this.db.collection('auth').doc(account.id).set(account);
  }

  async getAll(): Promise<FirebaseFirestore.WriteResult[]> {
    return await this.db
      .collection('auth')
      .get()
      .then((snapshot) => {
        let result: FirebaseFirestore.WriteResult[] = [];
        snapshot.forEach((doc) => {
          result.push(doc.data() as FirebaseFirestore.WriteResult);
        });
        return result;
      });
  }

  async getById(id: string): Promise<FirebaseFirestore.WriteResult> {
    return await this.db
      .collection('auth')
      .doc(id)
      .get()
      .then((doc) => {
        // console.log(doc.exists);
        if (doc.exists) {
          return doc.data() as FirebaseFirestore.WriteResult;
        } else {
          throw ErrorAccountNotFound;
        }
      });
  }

  async update(account: Auth): Promise<FirebaseFirestore.WriteResult> {
    return await this.db
      .collection('auth')
      .doc(account.id)
      .update({ ...account });
  }
}
