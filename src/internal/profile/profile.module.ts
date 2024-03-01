import { Module } from '@nestjs/common';
import { InteropService } from './interop/interop.service';
import { UsecaseService } from './usecase/usecase.service';
import { RepositoryService } from './repository/repository.service';
import { ProfileController } from './profile.controller';
@Module({
  providers: [
    { provide: 'ProfileRepository', useClass: RepositoryService },
    { provide: 'ProfileUseCase', useClass: UsecaseService },
    { provide: 'ProfileInterop', useClass: InteropService },
  ],
  controllers: [ProfileController],
  exports: ['ProfileRepository', 'ProfileUseCase', 'ProfileInterop'],
})
export class ProfileModule {}
