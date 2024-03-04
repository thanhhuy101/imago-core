import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role, RoleInterop } from '../../domain/role.domain';

@Controller('role')
export class RoleController {
  constructor(@Inject('RoleInterop') private roleInterop: RoleInterop) {}

  @Get()
  getAllRole(@Headers() headers: any) {
    let token = headers['authorization'];
    return this.roleInterop.getAllRole(token);
  }

  @Post()
  createRole(@Headers() headers: any, @Body() role: Role) {
    let token = headers['authorization'];
    return this.roleInterop.createRole(token, role);
  }

  @Put()
  updateRole(
    @Headers() headers: any,
    @Query('id') id: string,
    @Body() role: Role,
  ) {
    let token = headers['authorization'];
    return this.roleInterop.updateRole(token, id, role);
  }

  @Delete()
  deleteRole(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.roleInterop.deleteRole(token, id);
  }
}
