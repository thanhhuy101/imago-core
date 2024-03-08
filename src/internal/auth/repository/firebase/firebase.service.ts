import { Injectable } from '@nestjs/common';
import * as assmin from 'firebase-admin';
import { AuthDomain, AuthRepository, ErrorUnauthorized } from '../../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements AuthRepository {
  auth: assmin.auth.Auth;
  db = admin.firestore();
  // @ts-ignore
  constructor() {
    this.auth = assmin.auth();
  }

  async get(id: string): Promise<AuthDomain> {
    if (!id) {
      throw new Error('Invalid id');
    }

    try {
      const doc = await this.db.collection('auths').doc(id).get();
      if (!doc.exists) {
        throw ErrorUnauthorized;
      } else {
        return doc.data() as AuthDomain;
      }
    } catch (error) {
      // handle error
    }
  }
  async create(auth: AuthDomain): Promise<admin.firestore.WriteResult> {
    try {
      const db = this.auth;
      return await this.db.collection('auths').doc(auth.id).set(auth);
    }
    catch (error) {
      throw error;
    }
  }
  async update(auth: AuthDomain): Promise<admin.firestore.WriteResult> {
    try {
      // const db = this.auth;
      // @ts-ignore

      return await this.db.collection('auths').doc(auth.id).update(auth);
    } catch (error) {
      throw error;
    }
  }
  async list(): Promise<AuthDomain[]> {
    return await this.db.collection('auths').get().then((querySnapshot) => {
      let auths: AuthDomain[] = [];
      querySnapshot.forEach((doc) => {
        auths.push(doc.data() as AuthDomain);
      });
      return auths;
    })
  }


  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken = await this.auth.verifyIdToken(token);
      if (!decodedToken) {
        throw ErrorUnauthorized;
      }
      return decodedToken;
    } catch (error) {
      throw ErrorUnauthorized;
    }
  }
}
