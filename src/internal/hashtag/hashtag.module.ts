import { Module } from '@nestjs/common';
import { HashtagController } from './delivery/hashtag.controller';

import { UsecaseService } from './usecase/usecase.service';
import { RepositoryService } from './repository/repository.service';
import { InteropService } from './interop/interop.service';


// @ts-ignore
// @ts-ignore
// @ts-ignore
@Module({
  controllers: [HashtagController],
  providers: [
    {
      provide : 'HashtagRepository',
      useClass: RepositoryService
    },{
    provide: 'HashtagUseCase',
    useClass: UsecaseService
    },{
    provide: 'HashtagInterop',
      useClass: InteropService
    },
  ],
  exports: ['HashtagUseCase', 'HashtagRepository', 'HashtagInterop'],


})
export class HashtagModule {}
