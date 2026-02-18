import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(createPromptDto: CreatePromptDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: createPromptDto.categoryId },
    });

    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id: createPromptDto.subCategoryId },
    });

    if (!category || !subCategory) {
      throw new NotFoundException('Category or SubCategory not found');
    }

    const response = await this.aiService.generateLesson(
      category.name,
      subCategory.name,
      createPromptDto.prompt,
    );

    return this.prisma.prompt.create({
      data: {
        ...createPromptDto,
        response,
      },
      include: {
        category: true,
        subCategory: true,
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.prompt.findMany({
      include: {
        category: true,
        subCategory: true,
        user: { select: { id: true, name: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.prompt.findMany({
      where: { userId },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
