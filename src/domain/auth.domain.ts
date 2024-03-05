import { DecodedIdToken } from "firebase-admin/lib/auth";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as admin from 'firebase-admin';
export interface  AuthDomain {
  id: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: Date;
}
export interface AuthRepository {

  get(id: string): Promise<AuthDomain>;
  create(account: AuthDomain):Promise<admin.firestore.WriteResult>;
  update(account: AuthDomain): Promise<admin.firestore.WriteResult>;
  list(account: AuthDomain): Promise<AuthDomain[]>;
  verifyToken(token: string): Promise<DecodedIdToken>;

}

export interface AuthUseCase {
  get(id: string): Promise<AuthDomain>;
  create(account: AuthDomain):Promise<admin.firestore.WriteResult>;
  update(token: string, account: AuthDomain): Promise<AuthDomain>;
  list(account: AuthDomain): Promise<AuthDomain[]>;
  verifyToken(token: string): Promise<DecodedIdToken>;
}
export interface AuthInterop {
  get(id: string,token: string): Promise<AuthDomain>;
  create(token: string,account: AuthDomain):Promise<admin.firestore.WriteResult>;
  update( token: string, account: AuthDomain): Promise<admin.firestore.WriteResult>;
  list(token: string,account: AuthDomain): Promise<AuthDomain[]>;
  signUp(token: string,account: AuthDomain ): Promise<admin.firestore.WriteResult>;
  signIn(token: string,account: AuthDomain ): Promise<AuthDomain>;
  changeRole(token: string,id: string): Promise<admin.firestore.WriteResult>;
  block(token: string,id: string): Promise<admin.firestore.WriteResult>;
}

export const ErrorUnauthorized = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

export const ErrIdExisted: HttpException = new HttpException(
  'Auth existed',
  400,)