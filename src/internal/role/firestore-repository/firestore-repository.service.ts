import { Injectable } from '@nestjs/common';
import {
  Role,
  RolePagination,
  RoleRepository,
  searchRoleEmpty,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import { Auth } from '../../../domain/auth.domain';

@Injectable()
export class FirestoreRepositoryService implements RoleRepository {
  db = admin.firestore();

  constructor() {
    this.db = admin.firestore();
  }

  async getAllRole(page: number): Promise<RolePagination> {
    const roleRef = this.db.collection('roles');
    const snapshot = await roleRef.get();
    const roles = snapshot.docs.map((doc) => doc.data() as Role);
    const size = 10;
    return {
      data: roles.slice((page - 1) * size, page * size),
      endPage: Math.ceil(roles.length / size),
    };
  }

  async getListRole(page: number): Promise<any> {
    const size = 10;
    let auth = await this.db.collection('auth').get();
    let profile = await this.db.collection('profile').get();
    let result: any[] = [];
    auth.forEach((doc) => {
      let data = doc.data() as Auth;
      let profileData = profile.docs.find((p) => p.id === data.id);
      let roleData = profile.docs.find((p) => data.role === 'admin');
      if (profileData) {
        result.push({ ...data, ...profileData.data(), ...roleData });
      }
    });
    page = Math.ceil(result.length / size);
    return {
      data: result.slice((+page - 1) * size, +page * size),
      endPage: page,
    };
  }

  async searchRole(keyword: string, page: number): Promise<RolePagination> {
    const roleRef = this.db.collection('roles');
    const snapshot = await roleRef.get();
    const roles = snapshot.docs.map((doc) => doc.data() as Role);
    const getAllRoles = await this.getAllRole(page);
    roles.push(...getAllRoles.data);
    const size = 10;
    const searchResult = roles.filter((role) => role.name.includes(keyword));
    if (searchResult.length === 0) {
      throw searchRoleEmpty;
    }
    page = Math.ceil(searchResult.length / size);
    return {
      data: searchResult.slice((+page - 1) * size, +page * size),
      endPage: page,
    };
  }

  async createRole(role: Role): Promise<admin.firestore.WriteResult> {
    return await this.db.collection('roles').doc(role.id).set(role);
  }

  async updateRole(
    id: string,
    role: Partial<Role>,
  ): Promise<admin.firestore.WriteResult> {
    role.id = id;
    return await this.db.collection('roles').doc(id).update(role);
  }

  deleteRole(id: string): Promise<admin.firestore.WriteResult> {
    return this.db.collection('roles').doc(id).delete();
  }
}
