import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from './repositories/message.repository';

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
          provide: MESSAGE_REPOSITORY,
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
