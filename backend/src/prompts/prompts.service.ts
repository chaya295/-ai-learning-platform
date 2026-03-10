import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Injectable()
export class PromptsService {
  private readonly logger = new Logger(PromptsService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(createPromptDto: CreatePromptDto) {
    const { categoryId, subCategoryId, prompt, userId } = createPromptDto;

    if (!prompt?.trim()) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    const [category, subCategory] = await Promise.all([
      this.prisma.category.findUnique({ where: { id: categoryId } }),
      this.prisma.subCategory.findUnique({ where: { id: subCategoryId } }),
    ]);

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${subCategoryId} not found`);
    }

    this.logger.log(`Creating prompt for user ${userId} in ${category.name}/${subCategory.name}`);

    let response: string;
    try {
      response = await this.aiService.generateLesson(
        category.name,
        subCategory.name,
        prompt,
      );
    } catch (error) {
      this.logger.error(`AI Service Error: ${error.message}`, error.stack);
      throw error;
    }

    return this.prisma.prompt.create({
      data: {
        ...createPromptDto,
        response,
      },
      include: {
        category: true,
        subCategory: true,
        user: { select: { id: true, name: true, phone: true } },
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
    if (!userId || userId <= 0) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.prisma.prompt.findMany({
      where: { userId },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
