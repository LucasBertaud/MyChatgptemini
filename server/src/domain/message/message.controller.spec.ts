import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './repositories/message.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { AiService } from '../ai/ai.service';
import { DiscussionService } from '../discussion/discussion.service';
import { AiModule } from '../ai/ai.module';
import { DiscussionModule } from '../discussion/discussion.module';

describe('MessageController', () => {
  let controller: MessageController;
  const mockMessageRepository: MessageRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByDiscussion: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAiService = {
    generateResponse: jest.fn(),
    generateTitle: jest.fn(),
  };

  const mockDiscussionService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        MessageService,
        {
          provide: INJECTION_TOKENS.MESSAGE_REPOSITORY,
          useValue: mockMessageRepository,
        },
        {
          provide: AiService,
          useValue: mockAiService,
        },
        {
          provide: DiscussionService,
          useValue: mockDiscussionService,
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
