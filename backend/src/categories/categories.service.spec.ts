import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories with subcategories', async () => {
      const mockCategories = [
        { 
          id: 1, 
          name: 'Math', 
          createdAt: new Date(),
          subCategories: [
            { id: 1, name: 'Algebra', categoryId: 1, createdAt: new Date() }
          ]
        },
        { 
          id: 2, 
          name: 'Science', 
          createdAt: new Date(),
          subCategories: []
        },
      ];

      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories as any);

      const result = await service.findAll();
      expect(result).toEqual(mockCategories);
      expect(prisma.category.findMany).toHaveBeenCalledWith({
        include: { subCategories: true },
      });
    });

    it('should return empty array when no categories exist', async () => {
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });
});
