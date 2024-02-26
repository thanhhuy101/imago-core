import { Module } from '@nestjs/common';
import { RepositoryService } from './repository/repository.service';
import { UsecaseService } from './usecase/usecase.service';
import { InteropService } from './interop/interop.service';
import { PostController } from './post.controller';

@Module({
  providers: [
    { provide: 'PostRepository', useClass: RepositoryService },
    { provide: 'PostUseCase', useClass: UsecaseService },
    { provide: 'PostInterop', useClass: InteropService },
  ],
  controllers: [PostController],
  exports: ['PostRepository', 'PostUseCase', 'PostInterop'],
})
export class PostModule {}
