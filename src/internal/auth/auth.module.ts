import { Module } from '@nestjs/common';
import { BaseService } from './usecase/base/base.service';
import { FirebaseService } from './repository/firebase/firebase.service';
import { InteropService } from './interop/interop.service';
import { AuthController } from './delivery/auth.controller';


@Module({
  providers: [
    {
      provide : 'AuthRepository',
      useClass: FirebaseService
    },
    {
      provide: 'AuthUseCase',
      useClass: BaseService
    },{
    provide: 'AuthInterop',
    useClass: InteropService
    },

  ],
  exports: ['AuthUseCase', 'AuthRepository', 'AuthInterop'],
  controllers: [AuthController]
})
export class AuthModule {}
