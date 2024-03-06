import { Inject, Injectable } from '@nestjs/common';
import {
  Auth,
  AuthInterop,
  AuthUseCase,
  ErrorBlockFailed,
  ErrorInvalidRole,
  ErrorPermissionDenied,
} from '../../../domain/auth.domain';

@Injectable()
export class InteropService implements AuthInterop {
  constructor(@Inject('AuthUseCase') private authUseCase: AuthUseCase) {}

  async block(
    token: string,
    id: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const account = (await this.authUseCase.getById(id)) as any as Auth;
      account.isBanned = true;
      if (account.id === decodedToken.uid) {
        throw ErrorBlockFailed;
      } else {
        return await this.authUseCase.update(account);
      }
    } catch (e) {
      throw e;
    }
  }

  async changeRole(
    token: string,
    id: string,
    role: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const account = (await this.authUseCase.getById(id)) as any as Auth;
      account.role = role;
      if (!account.role || !['admin', 'user'].includes(account.role)) {
        throw ErrorInvalidRole;
      } else {
        return await this.authUseCase.update(account);
      }
    } catch (e) {
      throw e;
    }
  }

  async getAll(token: string): Promise<FirebaseFirestore.WriteResult[]> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const isAdmin = (await this.authUseCase.getById(
        decodedToken.uid,
      )) as any as Auth;

      if (isAdmin.role !== 'admin') {
        throw ErrorPermissionDenied;
      }
      return await this.authUseCase.getAll();
    } catch (e) {
      throw e;
    }
  }

  async getById(
    id: string,
    token: string,
  ): Promise<FirebaseFirestore.WriteResult> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      return await this.authUseCase.getById(id);
    } catch (e) {
      throw e;
    }
  }

  async signUp(token: string): Promise<FirebaseFirestore.WriteResult> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const accountData: Auth = {
        id: decodedToken.uid,
        email: decodedToken.email,
        role: 'user',
        isBanned: false,
        createdAt: new Date(),
      };
      return await this.authUseCase.create(accountData);
    } catch (e) {
      throw e;
    }
  }
}
