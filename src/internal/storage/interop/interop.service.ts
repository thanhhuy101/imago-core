import { Inject, Injectable } from '@nestjs/common';
import { StorageDomain, StorageInterop, StorageUseCase } from '../../../domain/storage.domain';

@Injectable()
export class InteropService implements StorageInterop {
  constructor(@Inject('StorageUseCase') private storageUsecase: StorageUseCase) { }

  async uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]> {
    return await this.storageUsecase.uploadFile(files, storage);
  }
}
