import { Module } from '@nestjs/common';
import { FirestoreService } from './repository/firestore/firestore.service';
import { BaseServiceUseCase } from './usecase/base/base.service';
import { BaseServiceInterop } from './interop/base/base.service';
import { ReportController } from './report.controller';
import { AuthModule } from '../auth/auth.module';


@Module({
  providers: [
    {
      provide: 'ReportRepository',
      useClass: FirestoreService
    },
    {
      provide: 'ReportUseCase',
      useClass: BaseServiceUseCase
    },
    {
      provide: 'ReportInterop',
      useClass: BaseServiceInterop
    }
  ],
  imports: [AuthModule],
  exports: ['ReportRepository', 'ReportUseCase', 'ReportInterop'],
  controllers: [ReportController]
})
export class ReportModule {}
