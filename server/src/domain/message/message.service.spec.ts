import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './repositories/message.repository';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { Message } from './entities/message.entity';
import { Discussion } from '../discussion/entities/discussion.entity';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { AiService } from '../ai/ai.service';
import { DiscussionService } from '../discussion/discussion.service';

describe('MessageService', () => {
  let service: MessageService;

  const mockMessageRepository: jest.Mocked<MessageRepository> = {
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
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MessageService>(MessageService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const dto: CreateMessageDto = {
      content: 'Bonjour le monde',
      discussionId: 'disc-123',
      ai: true,
    };

    const discussion: Discussion = {
      id: dto.discussionId,
      title: 'Titre de test',
      createdAt: new Date(),
      initializedBy: {
        id: 'user-123',
      },
      updatedAt: new Date(),
    };

    const createdMessage: Message = {
      id: 'msg-123',
      content: dto.content,
      ai: dto.ai,
      createdAt: new Date(),
      discussion,
    };

    mockMessageRepository.create.mockResolvedValue(createdMessage);

    const result = await service.create(dto);

    expect(mockMessageRepository.create).toHaveBeenCalledWith(dto);
    expect(result.ai.content).toBe('Bonjour le monde');
    expect(result.ai.ai).toBe(true);
    expect(result.ai.discussion.id).toBe(discussion.id);
  });

  it('should find a message by ID', async () => {
    const id: FindByUuidDto = { id: 'msg-1' };

    const message: Message = {
      id: id.id,
      content: 'Yo',
      ai: true,
      createdAt: new Date(),
      discussion: {
        id: 'disc-1',
        title: 'Une discussion',
        createdAt: new Date(),
        initializedBy: {
          id: 'user-99',
        },
        updatedAt: new Date(),
      },
    };

    mockMessageRepository.findById.mockResolvedValue(message);

    const result = await service.findById(id);

    expect(mockMessageRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(message);
    expect(result.ai).toBe(true);
  });

  it('should find messages by discussion ID', async () => {
    const discussionId: string = 'disc-999';

    const messages: Message[] = [
      {
        id: 'msg-1',
        content: 'Coucou',
        ai: false,
        createdAt: new Date(),
        discussion: {
          id: discussionId,
          title: 'Test Discussion',
          createdAt: new Date(),
          initializedBy: {
            id: 'user-321',
          },
          updatedAt: new Date(),
        },
      },
    ];

    mockMessageRepository.findByDiscussion.mockResolvedValue(messages);

    const result = await service.findByDiscussion(discussionId);

    expect(mockMessageRepository.findByDiscussion).toHaveBeenCalledWith(
      discussionId,
    );
    expect(result).toEqual(messages);
  });

  it('should update a message', async () => {
    const id: string = 'msg-42';
    const updateDto: UpdateMessageDto = {
      content: 'Contenu mis à jour',
      ai: true,
    };

    const updatedMessage: Message = {
      id: id,
      content: updateDto.content,
      ai: true,
      createdAt: new Date(),
      discussion: {
        id: 'disc-1',
        title: 'Discussion',
        createdAt: new Date(),
        initializedBy: {
          id: 'user-1',
        },
        updatedAt: new Date(),
      },
    };

    mockMessageRepository.update.mockResolvedValue(updatedMessage);

    const result = await service.update(id, updateDto);
    expect(mockMessageRepository.update).toHaveBeenCalledWith(id, updateDto);
    expect(result.content).toBe(updateDto.content);
  });

  it('should delete a message', async () => {
    const id: FindByUuidDto = { id: 'msg-delete' };

    mockMessageRepository.delete.mockResolvedValue(null);

    await service.remove(id);

    expect(mockMessageRepository.delete).toHaveBeenCalledWith(id);
  });
});
