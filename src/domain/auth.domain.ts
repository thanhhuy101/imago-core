import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface Auth {
  id: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: Date;
}

export interface AuthRepository {
  getById(id: string): Promise<FirebaseFirestore.WriteResult>;

  create(account: Auth): Promise<FirebaseFirestore.WriteResult>;

  update(account: Auth): Promise<FirebaseFirestore.WriteResult>;

  getAll(): Promise<FirebaseFirestore.WriteResult[]>;

  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface AuthUseCase {
  getById(id: string): Promise<FirebaseFirestore.WriteResult>;

  create(account: Auth): Promise<FirebaseFirestore.WriteResult>;

  update(account: Auth): Promise<FirebaseFirestore.WriteResult>;

  getAll(): Promise<FirebaseFirestore.WriteResult[]>;

  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface AuthInterop {
  getById(id: string, token: string): Promise<FirebaseFirestore.WriteResult>;

  getAll(token: string): Promise<FirebaseFirestore.WriteResult[]>;

  signUp(token: string): Promise<FirebaseFirestore.WriteResult>;

  changeRole(
    token: string,
    id: string,
    role: string,
  ): Promise<FirebaseFirestore.WriteResult>;

  block(token: string, id: string): Promise<FirebaseFirestore.WriteResult>;
}

export const ErrorUnauthorized = new HttpException(
  'Unauthorized',
  HttpStatus.UNAUTHORIZED,
);

export const ErrorAccountExists = new HttpException(
  'Account already exists',
  HttpStatus.BAD_REQUEST,
);

export const ErrorAccountNotFound = new HttpException(
  'Account not found',
  HttpStatus.NOT_FOUND,
);

export const ErrorIdNotFound = new HttpException(
  'Id not found',
  HttpStatus.BAD_REQUEST,
);

export const ErrorInvalidToken = new HttpException(
  'Invalid token',
  HttpStatus.UNAUTHORIZED,
);

export const ErrorInvalidRole = new HttpException(
  'Invalid role',
  HttpStatus.BAD_REQUEST,
);
