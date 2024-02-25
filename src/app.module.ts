import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { CategoryModule } from './internal/category/category.module';
import { CategoryController } from './internal/category/category.controller';

@Module({
  imports: [AuthModule, CategoryModule],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
