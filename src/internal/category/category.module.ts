import { Module } from '@nestjs/common';
import { CategoryController } from './delivery/category.controller';
import { CategoryRepositoryBaseService } from './repository/base/base.service';
import { CategoryUseCaseBaseService } from './usecase/base/base.service';
import { CategoryInteropBaseService } from './interop/base/base.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepositoryBaseService,
    },
    {
      provide: 'CategoryUseCase',
      useClass: CategoryUseCaseBaseService,
    },
    {
      provide: 'CategoryInterop',
      useClass: CategoryInteropBaseService,
    },

  ],
  exports: [
    'CategoryRepository',
    'CategoryUseCase',
    'CategoryInterop',
  ],
  imports: [
    AuthModule
  ],
})
export class CategoryModule {}
