import { Test, TestingModule } from '@nestjs/testing';
import { RoleBaseInteropService } from './role-base-interop.service';

describe('RoleBaseInteropService', () => {
  let service: RoleBaseInteropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleBaseInteropService],
    }).compile();

    service = module.get<RoleBaseInteropService>(RoleBaseInteropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
