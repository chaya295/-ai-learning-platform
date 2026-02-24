import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

describe('PromptsService', () => {
  let service: PromptsService;
  let prisma: PrismaService;
  let aiService: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromptsService,
        {
          provide: PrismaService,
          useValue: {
            category: { findUnique: jest.fn() },
            subCategory: { findUnique: jest.fn() },
            prompt: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: AiService,
          useValue: {
            generateLesson: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PromptsService>(PromptsService);
    prisma = module.get<PrismaService>(PrismaService);
    aiService = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a prompt successfully', async () => {
      const createDto = {
        userId: 1,
        categoryId: 1,
        subCategoryId: 1,
        prompt: 'Test prompt',
      };

      const mockCategory = { id: 1, name: 'Math', createdAt: new Date() };
      const mockSubCategory = { id: 1, name: 'Algebra', categoryId: 1, createdAt: new Date() };
      const mockPrompt = { 
        id: 1, 
        ...createDto, 
        response: 'AI response',
        createdAt: new Date(),
        category: mockCategory,
        subCategory: mockSubCategory,
        user: { id: 1, name: 'Test User', phone: '1234567890' }
      };

      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(mockCategory as any);
      jest.spyOn(prisma.subCategory, 'findUnique').mockResolvedValue(mockSubCategory as any);
      jest.spyOn(aiService, 'generateLesson').mockResolvedValue('AI response');
      jest.spyOn(prisma.prompt, 'create').mockResolvedValue(mockPrompt as any);

      const result = await service.create(createDto);
      
      expect(result).toBeDefined();
      expect(result.response).toBe('AI response');
      expect(aiService.generateLesson).toHaveBeenCalledWith('Math', 'Algebra', 'Test prompt');
      expect(prisma.prompt.create).toHaveBeenCalled();
    });

    it('should throw NotFoundException if category not found', async () => {
      const createDto = { userId: 1, categoryId: 999, subCategoryId: 1, prompt: 'test' };
      
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.subCategory, 'findUnique').mockResolvedValue({ id: 1 } as any);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if subCategory not found', async () => {
      const createDto = { userId: 1, categoryId: 1, subCategoryId: 999, prompt: 'test' };
      
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue({ id: 1 } as any);
      jest.spyOn(prisma.subCategory, 'findUnique').mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all prompts ordered by date', async () => {
      const mockPrompts = [
        { id: 1, prompt: 'Test 1', createdAt: new Date() },
        { id: 2, prompt: 'Test 2', createdAt: new Date() },
      ];
      
      jest.spyOn(prisma.prompt, 'findMany').mockResolvedValue(mockPrompts as any);

      const result = await service.findAll();
      
      expect(result).toEqual(mockPrompts);
      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        include: {
          category: true,
          subCategory: true,
          user: { select: { id: true, name: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findByUser', () => {
    it('should return prompts for specific user', async () => {
      const userId = 1;
      const mockPrompts = [
        { id: 1, userId, prompt: 'User prompt', createdAt: new Date() },
      ];
      
      jest.spyOn(prisma.prompt, 'findMany').mockResolvedValue(mockPrompts as any);

      const result = await service.findByUser(userId);
      
      expect(result).toEqual(mockPrompts);
      expect(prisma.prompt.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: {
          category: true,
          subCategory: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
