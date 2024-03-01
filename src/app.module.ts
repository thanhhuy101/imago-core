import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './internal/category/category.module';
import { CategoryController } from './internal/category/delivery/category.controller';
import { PostModule } from './internal/post/post.module';
import { AuthModule } from './internal/auth/auth.module';
import { AuthController } from './internal/auth/delivery/auth.controller';
import { HashtagModule } from './internal/hashtag/hashtag.module';
import { ProfileModule } from './internal/profile/profile.module';
import { CommentModule } from './internal/comment/comment.module';
import { ProfileController } from './internal/profile/profile.controller';
import { ReportController } from './internal/report/report.controller';
import { CommentController } from './internal/comment/delivery/comment.controller';
import { HttpController } from './internal/post/delivery/http.controller';
import { ReportModule } from './internal/report/report.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    ProfileModule,
    CommentModule,
    ReportModule,
    HashtagModule
  ],
  controllers: [
    AppController,
    CategoryController,
    ProfileController,
    ReportController,
    CommentController,
    AuthController,
    HttpController
    
  ],
  providers: [AppService],
})
export class AppModule {}
