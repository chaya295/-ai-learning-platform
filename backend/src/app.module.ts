import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PromptsModule } from './prompts/prompts.module';

@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, PromptsModule],
})
export class AppModule {}
