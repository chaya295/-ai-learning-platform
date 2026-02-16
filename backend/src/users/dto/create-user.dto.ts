import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Israel Cohen', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '0501234567', description: 'Phone number (10 digits)' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Phone must be exactly 10 digits' })
  phone: string;
}
