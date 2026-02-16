import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePromptDto {
  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  subCategoryId: number;

  @IsString()
  @IsNotEmpty()
  prompt: string;
}
