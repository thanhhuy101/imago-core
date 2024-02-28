import { Inject, Injectable } from '@nestjs/common';

import { AuthDomain, AuthInterop, AuthUseCase, ErrIdExisted, ErrorUnauthorized } from '../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class InteropService implements AuthInterop {
    constructor(@Inject('AuthUseCase')private authUseCase: AuthUseCase) {}
  async get(id: string,token: string): Promise<AuthDomain> {
    try{
      // await this.authUseCase.verifyToken(token);
      return await this.authUseCase.get(id);
    }catch (e){
      throw e;
    }
  }
  // @ts-ignore
  async create(auth: AuthDomain,token: string): Promise<FirebaseFirestore.WriteResult> {
    try{
        const existingUser = await this.authUseCase.get(auth.id);
      if (existingUser){
        throw ErrorUnauthorized;
      }
      return await this.authUseCase.create(auth);
    }
    catch (e){
      throw e;
    }}

  async signUp(auth: AuthDomain,token: string): Promise<FirebaseFirestore.WriteResult> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      auth.id = decodedIdToken.uid;
      auth.email = decodedIdToken.email;
      auth.role = 'default';
      auth.status = 'active';
      return await this.create(auth, token);
    }
    catch (e){
      throw e;
    }
  }

  async signIn(auth: AuthDomain,token: string): Promise<AuthDomain> {
    try {
      let decodedIdToken = await this.authUseCase.verifyToken(token);
      let user = await this.authUseCase.get(decodedIdToken.uid);
      if (user.id == decodedIdToken.uid){
        return await this.get(decodedIdToken.uid, token);
      }
      else {
        throw new Error('User not found');
      }

    }
    catch (e){
      throw e;
    }
  }

  // @ts-ignore
  async update(auth: AuthDomain): Promise<AuthDomain> {
    try {
      return await this.authUseCase.update(auth);
    } catch (error) {
      throw error;
    }
  }
  async list(auth: AuthDomain): Promise<AuthDomain[]> {
    return await this.authUseCase.list(auth);
  }
  verifyToken(token: string): Promise<DecodedIdToken> {
    throw new Error('Method not implemented.');
  }
}
