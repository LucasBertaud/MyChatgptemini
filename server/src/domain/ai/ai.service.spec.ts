import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { AiPort } from './ai.port';

describe('AiService', () => {
  let service: AiService;

  const mockAiPort: jest.Mocked<AiPort> = {
    generateResponse: jest.fn(),
    generateTitle: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: INJECTION_TOKENS.AI_SERVICE,
          useValue: mockAiPort,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should return a valid response', async () => {
      const prompt = 'Hello AI';
      const aiResponse = 'Hello, how can I help you?';

      mockAiPort.generateResponse.mockResolvedValue(aiResponse);

      const result = await service.generateResponse(prompt);

      expect(mockAiPort.generateResponse).toHaveBeenCalledWith(prompt);
      expect(result).toBe(aiResponse);
    });

    it('should throw an error if response is null', async () => {
      const prompt = 'Hello AI';

      mockAiPort.generateResponse.mockResolvedValue(null);

      await expect(service.generateResponse(prompt)).rejects.toThrow(
        'AI service error: Response is null or empty',
      );
    });

    it('should throw an error if response is empty', async () => {
      const prompt = 'Hello AI';

      mockAiPort.generateResponse.mockResolvedValue('');

      await expect(service.generateResponse(prompt)).rejects.toThrow(
        'AI service error: Response is null or empty',
      );
    });
  });

  describe('generateTitle', () => {
    it('should return a valid title', async () => {
      const prompt = 'AI Title';
      const aiTitle = 'Generated Title';

      mockAiPort.generateTitle.mockResolvedValue(aiTitle);

      const result = await service.generateTitle(prompt);

      expect(mockAiPort.generateTitle).toHaveBeenCalledWith(prompt);
      expect(result).toBe(aiTitle);
    });

    it('should throw an error if title is null', async () => {
      const prompt = 'AI Title';

      mockAiPort.generateTitle.mockResolvedValue(null);

      await expect(service.generateTitle(prompt)).rejects.toThrow(
        'AI service error: Response is null or empty',
      );
    });

    it('should throw an error if title is empty', async () => {
      const prompt = 'AI Title';

      mockAiPort.generateTitle.mockResolvedValue('');

      await expect(service.generateTitle(prompt)).rejects.toThrow(
        'AI service error: Response is null or empty',
      );
    });
  });
});
