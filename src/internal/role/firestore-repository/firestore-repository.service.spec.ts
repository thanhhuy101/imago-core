import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreRepositoryService } from './firestore-repository.service';

describe('FirestoreRepositoryService', () => {
  let service: FirestoreRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoreRepositoryService],
    }).compile();

    service = module.get<FirestoreRepositoryService>(FirestoreRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
