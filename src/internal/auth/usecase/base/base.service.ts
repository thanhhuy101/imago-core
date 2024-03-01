import { Inject, Injectable } from "@nestjs/common";
import { AuthDomain, AuthRepository, AuthUseCase } from '../../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class BaseService implements AuthUseCase {
  constructor(@Inject('AuthRepository') private repository: AuthRepository) {
  }

  async get(id: string): Promise<AuthDomain> {
    return this.repository.get(id);
  }

  async create(auth: AuthDomain): Promise<FirebaseFirestore.WriteResult> {
    // console.log(auth);
    return this.repository.create(auth);
  }

  // @ts-ignore
  async update(auth: AuthDomain): Promise<FirebaseFirestore.WriteResult> {
    return this.repository.update(auth);
  }

  async list(auth: AuthDomain): Promise<AuthDomain[]> {
    return this.repository.list(auth);
  }

  verifyToken(token: string): Promise<DecodedIdToken> {
    return this.repository.verifyToken(token);
  }
}
