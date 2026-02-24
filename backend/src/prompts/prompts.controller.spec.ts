import { Test, TestingModule } from '@nestjs/testing';
import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';

describe('PromptsController', () => {
  let controller: PromptsController;
  let service: PromptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptsController],
      providers: [
        {
          provide: PromptsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PromptsController>(PromptsController);
    service = module.get<PromptsService>(PromptsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a prompt', async () => {
      const createDto = {
        userId: 1,
        categoryId: 1,
        subCategoryId: 1,
        prompt: 'Test prompt',
      };
      const mockPrompt = { id: 1, ...createDto, response: 'AI response' };

      jest.spyOn(service, 'create').mockResolvedValue(mockPrompt as any);

      const result = await controller.create(createDto);
      expect(result).toEqual(mockPrompt);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all prompts', async () => {
      const mockPrompts = [{ id: 1, prompt: 'Test' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockPrompts as any);

      const result = await controller.findAll();
      expect(result).toEqual(mockPrompts);
    });
  });

  describe('findByUser', () => {
    it('should return prompts for specific user', async () => {
      const userId = '1';
      const mockPrompts = [{ id: 1, userId: 1, prompt: 'User prompt' }];
      
      jest.spyOn(service, 'findByUser').mockResolvedValue(mockPrompts as any);

      const result = await controller.findByUser(userId);
      expect(result).toEqual(mockPrompts);
      expect(service.findByUser).toHaveBeenCalledWith(1);
    });
  });
});
