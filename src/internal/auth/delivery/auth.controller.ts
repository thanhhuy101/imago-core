import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthDomain, AuthInterop } from '../../../domain/auth.domain';

@Controller('v1/auth')
export class AuthController {
  constructor(@Inject('AuthInterop') private authInterop: AuthInterop) {}

  @Post('signup')
  signUp(@Headers() headers: any, @Body() auth: AuthDomain) {
    let token = headers['authorization'];
    return this.authInterop.signUp(token, auth);
  }

  @Post('signin')
  signIn(@Headers() headers: any, @Body() auth: AuthDomain) {
    let token = headers['authorization'];
    return this.authInterop.signIn(token, auth);
  }

  @Put('changerole')
  changeRole(@Headers() headers: any, @Body() auth: AuthDomain) {
    let token = headers['authorization'];
    // @ts-ignore
    return this.authInterop.update(auth, token);
  }

  @Put('block')
  block(@Headers() headers: any, @Body() auth: AuthDomain) {
    let token = headers['authorization'];

    return this.authInterop.update(auth, token);
  }

  @Get('list')
  list(@Headers() headers: any, @Body() auth: AuthDomain) {
    let token = headers['authorization'];
    return this.authInterop.list(token, auth);
  }

  @Get('getId')
  getId(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.authInterop.get(id, token);
  }
}
