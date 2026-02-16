import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PromptsModule } from './prompts/prompts.module';

@Module({
  imports: [UsersModule, CategoriesModule, PromptsModule],
})
export class AppModule {}
