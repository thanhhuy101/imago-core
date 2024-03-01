import { Module } from '@nestjs/common';
import { CommentInteropBaseService } from './interop/base/base.service';
import { CommentUseCaseBaseService } from './usecase/base/base.service';
import { CommentRepositoryBaseService } from './repository/base/base.service';
import { CommentController } from './delivery/comment.controller';
import { CategoryRepositoryBaseService } from '../category/repository/base/base.service';
import { CategoryUseCaseBaseService } from '../category/usecase/base/base.service';
import { CategoryInteropBaseService } from '../category/interop/base/base.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CommentController],
  providers: [
    {
      provide: 'CommentRepository',
      useClass: CommentRepositoryBaseService,
    },
    {
      provide: 'CommentUseCase',
      useClass: CommentUseCaseBaseService,
    },
    {
      provide: 'CommentInterop',
      useClass: CommentInteropBaseService,
    },
    {
      provide: 'CommentCommentDelivery',
      useClass: CommentController,
    },
  ],
  exports: [
    'CommentRepository',
    'CommentUseCase',
    'CommentInterop',
    'CommentCommentDelivery',
  ],
})
export class CommentModule {}
