import { Module } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Module({
  controllers: [PromptsController],
  providers: [PromptsService, PrismaService, AiService],
})
export class PromptsModule {}
