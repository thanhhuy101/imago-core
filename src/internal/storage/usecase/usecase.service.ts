import { Inject, Injectable } from '@nestjs/common';
import { ErrorQuantity, StorageDomain, StorageRepository, StorageUseCase } from '../../../domain/storage.domain';
import { storage } from 'firebase-admin';
@Injectable()
export class UsecaseService implements StorageUseCase {
  constructor(@Inject('StorageRepository') private storageRepo: StorageRepository) { }

  async uploadFile(files: Express.Multer.File[], storage: StorageDomain): Promise<string[]> {
    if (files.length > 5) {
      throw ErrorQuantity;
    }
    return await this.storageRepo.uploadFile(files, storage);
  }

}