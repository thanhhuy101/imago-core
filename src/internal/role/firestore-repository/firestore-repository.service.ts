import { Injectable } from '@nestjs/common';
import {
  errMessUnauthorized,
  errorRoleNotFound,
  Role,
  RoleInterop,
  RoleRepository,
  RoleUseCase,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class FirestoreRepositoryService implements RoleRepository {
  db = admin.firestore();

  constructor() {
    this.db = admin.firestore();
  }

  async getAllRole(): Promise<Role[]> {
    return await this.db
      .collection('roles')
      .get()
      .then((querySnapshot) => {
        let roles: Role[] = [];
        querySnapshot.forEach((doc) => {
          roles.push(doc.data() as Role);
        });
        return roles;
      });
  }

  createRole(role: Role): any {
    role.id = Date.now().toString();
    const roleRef = this.db.collection('roles').doc(role.id).set(role);
    return {
      id: role.id,
      name: role.name,
      description: role.description,
    };
  }
  
  updateRole(id: string, role: Partial<Role>): any {
    role.id = id;
    const roleRef = this.db.collection('roles').doc(id).update(role);
    return {
      id: id,
      name: role.name,
      description: role.description,
    };
  }

  deleteRole(id: string) {
    return this.db.collection('roles').doc(id).delete();
  }

  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      let decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken.uid == null) {
        throw errMessUnauthorized;
      }
      return decodedToken;
    } catch (error) {
      throw errMessUnauthorized;
    }
  }
}
