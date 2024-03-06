import { Inject, Injectable } from '@nestjs/common';

import {
  AuthDomain,
  AuthInterop,
  AuthUseCase,
  ErrIdExisted,
  ErrorUnauthorized,
} from '../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class InteropService implements AuthInterop {
  constructor(@Inject('AuthUseCase') private authUseCase: AuthUseCase) {}
  async get(id: string, token: string): Promise<AuthDomain> {
    try {
      return await this.authUseCase.get(id);
    } catch (e) {
      throw e;
    }
  }

  // @ts-ignore
  async create(
    token: string,
    auth: AuthDomain,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      return await this.authUseCase.create(auth);
    } catch (e) {
      throw e;
    }
  }

  async signUp(
    token: string,
    auth: AuthDomain,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      auth.id = decodedIdToken.uid;
      auth.email = decodedIdToken.email;
      auth.role = 'default';
      auth.createdAt = new Date();
      auth.isBanned = false;
      return await this.create(token, auth);
    } catch (e) {
      throw e;
    }
  }

  async signIn(token: string): Promise<AuthDomain> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      await this.authUseCase.get(decodedIdToken.uid);
      return await this.get(decodedIdToken.uid, token);
    } catch (e) {
      throw e;
    }
  }
  // @ts-ignore
  async update(id: string, auth: AuthDomain): Promise<AuthDomain> {
    try {
      return await this.authUseCase.update(id, auth);
    } catch (error) {
      throw error;
    }
  }

  // @ts-ignore
  async changeRole(token: string, id: string): Promise<AuthDomain> {
    try {
      let auth = await this.authUseCase.get(id);
      if (auth.role === 'admin') {
        auth.role = 'default';
        return await this.authUseCase.update(token, auth);
      } else {
        auth.role = 'admin';
        return await this.authUseCase.update(token, auth);
      }
    } catch (error) {
      throw error;
    }
  }
  async list(token: string, auth: AuthDomain): Promise<AuthDomain[]> {
    return await this.authUseCase.list(auth);
  }
  // @ts-ignore
  async block(token: string, id: string): Promise<AuthDomain> {
    try {
      let auth = await this.authUseCase.get(id);
      auth.isBanned = !auth.isBanned;
      return await this.authUseCase.update(token, auth);
    } catch (error) {
      throw error;
    }
  }
  verifyToken(token: string): Promise<DecodedIdToken> {
    throw new Error('Method not implemented.');
  }

  verifyRole(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
