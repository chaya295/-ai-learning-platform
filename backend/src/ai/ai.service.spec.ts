import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';

jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    })),
  };
});

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    process.env.OPENAI_API_KEY = 'test-key';
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiService],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    delete process.env.OPENAI_API_KEY;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateLesson', () => {
    it('should return a lesson response', async () => {
      const result = await service.generateLesson('Math', 'Algebra', 'Explain quadratic equations');
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle different categories', async () => {
      const result = await service.generateLesson('Science', 'Physics', 'Explain gravity');
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
