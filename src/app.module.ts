import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { CategoryModule } from './internal/category/category.module';
import { CategoryController } from './internal/category/category.controller';
import { PostModule } from './internal/post/post.module';
import { PostController } from './internal/post/post.controller';
import { RoleModule } from './internal/role/role.module';

@Module({
  imports: [AuthModule, CategoryModule, PostModule, RoleModule],
  controllers: [AppController, CategoryController, PostController],
  providers: [AppService],
})
export class AppModule {}
