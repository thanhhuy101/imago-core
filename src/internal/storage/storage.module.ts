import { Module } from '@nestjs/common';
import { InteropService } from './interop/interop.service';
import { RepositoryService } from './repository/repository.service';
import { UsecaseService } from './usecase/usecase.service';
import { StorageController } from './storage.controller';



@Module({
  providers: [{
    provide: 'StorageInterop',
    useClass: InteropService

  },
    {
      provide: 'StorageRepository',
      useClass: RepositoryService

    },
    {
      provide: 'StorageUseCase',
      useClass: UsecaseService
    },
  ],
  controllers: [StorageController],
  exports: ['StorageInterop', 'StorageRepository', 'StorageUseCase']
})
export class StorageModule {}