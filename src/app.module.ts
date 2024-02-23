import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './client/auth/auth.module';
import { CategoryModule } from './client/category/category.module';
import { CategoryController } from './client/category/category.controller';

@Module({
  imports: [AuthModule, CategoryModule],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
