import { Controller, Get, Post, Body, Param, ValidationPipe } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  create(@Body(ValidationPipe) createPromptDto: CreatePromptDto) {
    return this.promptsService.create(createPromptDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.promptsService.findByUser(+userId);
  }
}
