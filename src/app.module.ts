import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './internal/category/category.module';
import { CategoryController } from './internal/category/category.controller';
import { PostModule } from './internal/post/post.module';
import { PostController } from './internal/post/post.controller';
import { AuthModule } from './internal/auth/auth.module';
import { AuthController } from './internal/auth/delivery/auth.controller';
import { HashtagModule } from './internal/hashtag/hashtag.module';



@Module({
  imports: [AuthModule, CategoryModule, PostModule,HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
