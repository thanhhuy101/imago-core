import { Inject, Injectable } from '@nestjs/common';
import {
  errMessUnauthorized,
  Role,
  RoleInterop,
  RoleUseCase,
  tokenDoesNotExit,
} from '../../../domain/role.domain';

@Injectable()
export class RoleBaseInteropService implements RoleInterop {
  constructor(@Inject('RoleUseCase') private roleUseCase: RoleUseCase) {}

  async getAllRole(token: string): Promise<Role[]> {
    try {
      let decodedToken = await this.roleUseCase.verifyToken(token);
      return await this.roleUseCase.getAllRole();
    } catch (error) {
      throw errMessUnauthorized;
    }
  }

  async createRole(token: string, role: Role) {
    try {
      let decodedToken = await this.roleUseCase.verifyToken(token);
      role.id = decodedToken.uid;
      return this.roleUseCase.createRole(role);
    } catch (error) {
      throw error;
    }
  }

  async updateRole(token: string, id: string, role: Role) {
    try {
      let decodedToken = await this.roleUseCase.verifyToken(token);
      role.id = decodedToken.uid;
      return this.roleUseCase.updateRole(id, role);
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(token: string, id: string) {
    try {
      let decodedToken = await this.roleUseCase.verifyToken(token);
      return this.roleUseCase.deleteRole(id);
    } catch (error) {
      throw error;
    }
  }
}
