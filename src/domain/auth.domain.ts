import { DecodedIdToken } from "firebase-admin/lib/auth";
import { HttpException, HttpStatus } from "@nestjs/common";

export interface AuthRepository {
  verifyToken(token: string): Promise<DecodedIdToken>;
}

export interface AuthUseCase {
  verifyToken(token: string): Promise<DecodedIdToken>;
}

export const ErrorUnauthorized = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);