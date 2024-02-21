import { Injectable } from '@nestjs/common';

import * as assmin from 'firebase-admin';
import { AuthRepository, ErrorUnauthorized } from "../../../../domain/auth.domain";
import { DecodedIdToken } from "firebase-admin/lib/auth";

@Injectable()
export class FirebaseService implements AuthRepository {
  auth: assmin.auth.Auth;

  constructor() {
    this.auth = assmin.auth();
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
