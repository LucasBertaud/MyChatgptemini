import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './repositories/message.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';

describe('MessageController', () => {
  let controller: MessageController;
  const mockMessageRepository: MessageRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByDiscussion: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
