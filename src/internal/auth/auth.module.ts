import { Module } from '@nestjs/common';
import { BaseService } from './usecase/base/base.service';
import { FirebaseService } from './repository/firebase/firebase.service';

@Module({
  providers: [
    {
      provide : 'AuthRepository',
      useClass: FirebaseService
    },
    {
      provide: 'AuthUseCase',
      useClass: BaseService
    }
  ],
  exports: ['AuthUseCase', 'AuthRepository']
})
export class AuthModule {}
