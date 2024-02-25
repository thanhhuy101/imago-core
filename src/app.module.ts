import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { CategoryModule } from './internal/category/category.module';
import { CommentModule } from './internal/comment/comment.module';
import { PostModule } from './internal/post/post.module';
import { ProfileModule } from './internal/profile/profile.module';
import { RoleModule } from './internal/role/role.module';
import { StorageModule } from './internal/storage/storage.module';
import { ReportModule } from './internal/report/report.module';
import { HashtagModule } from './internal/hashtag/hashtag.module';

@Module({
  imports: [AuthModule, CategoryModule, CommentModule, PostModule, ProfileModule, RoleModule, StorageModule, ReportModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
