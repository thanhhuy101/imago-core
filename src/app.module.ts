import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { CategoryModule } from './internal/category/category.module';
import { CategoryController } from './internal/category/delivery/category.controller';
import { PostModule } from './internal/post/post.module';
import { ProfileModule } from './internal/profile/profile.module';
import { ProfileController } from './internal/profile/profile.controller';
import { CommentModule } from './internal/comment/comment.module';
import { CommentController } from './internal/comment/delivery/comment.controller';
import { ReportModule } from './internal/report/report.module';
import { ReportController } from './internal/report/report.controller';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    ProfileModule,
    CommentModule,
    ReportModule,
  ],
  controllers: [
    AppController,
    CategoryController,
    ProfileController,
    ReportController,
    CommentController,
  ],
  providers: [AppService],
})
export class AppModule {}
