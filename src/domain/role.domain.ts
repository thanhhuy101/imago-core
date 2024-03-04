import { HttpException, HttpStatus } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface RoleRepository {
  getAllRole(): Promise<Role[]>;

  createRole(role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(id: string, role: Role): Promise<admin.firestore.WriteResult>;

  deleteRole(id: string);

  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface RoleUseCase {
  getAllRole(): Promise<Role[]>;

  createRole(role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(id: string, role: Role): Promise<admin.firestore.WriteResult>;

  deleteRole(id: string);

  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface RoleInterop {
  getAllRole(token: string): Promise<Role[]>;

  createRole(token: string, role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(
    token: string,
    id: string,
    role: Role,
  ): Promise<admin.firestore.WriteResult>;

  deleteRole(token: string, id: string);
}

export const errorRoleAlreadyExist = new HttpException(
  'Role Already Exist',
  HttpStatus.NOT_FOUND,
);
export const errorRoleNotFound = new HttpException(
  'Role Not Found',
  HttpStatus.NOT_FOUND,
);
export const errMessUnauthorized = new HttpException(
  'Unauthorized',
  HttpStatus.NOT_FOUND,
);
export const tokenDoesNotExit = new HttpException(
  'Token does not exist',
  HttpStatus.NOT_FOUND,
);
