import { Controller, Get, Post, Body, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('prompts')
@UseGuards(JwtAuthGuard)
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  create(@Body(ValidationPipe) createPromptDto: CreatePromptDto) {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll() {
    return this.promptsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.promptsService.findByUser(+userId);
  }
}
