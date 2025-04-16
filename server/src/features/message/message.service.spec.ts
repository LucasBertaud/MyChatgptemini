import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from './repositories/message.repository';
import { FindByUuidDto } from 'src/core/dto/find-by-uuid.dto';
import { Message } from './entities/message.entity';
import { Discussion } from '../discussion/entities/discussion.entity';

describe('MessageService', () => {
  let service: MessageService;

  const mockMessageRepository: jest.Mocked<MessageRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findByDiscussion: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: MESSAGE_REPOSITORY,
          useValue: mockMessageRepository,
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
      ai: false,
    };

    const discussion: Discussion = {
      id: dto.discussionId,
      title: 'Titre de test',
      createdAt: new Date(),
      initializedBy: {
        id: 'user-123',
        name: 'Toto',
        email: 'toto@mail.com',
      },
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
    expect(result).toEqual(createdMessage);
    expect(result.content).toBe(dto.content);
    expect(result.ai).toBe(false);
    expect(result.discussion.id).toBe(discussion.id);
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
          name: 'Bot',
          email: 'bot@ai.com',
        },
      },
    };

    mockMessageRepository.findById.mockResolvedValue(message);

    const result = await service.findById(id);

    expect(mockMessageRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(message);
    expect(result.ai).toBe(true);
  });

  it('should find messages by discussion ID', async () => {
    const discussionId: FindByUuidDto = { id: 'disc-999' };

    const messages: Message[] = [
      {
        id: 'msg-1',
        content: 'Coucou',
        ai: false,
        createdAt: new Date(),
        discussion: {
          id: discussionId.id,
          title: 'Test Discussion',
          createdAt: new Date(),
          initializedBy: {
            id: 'user-321',
            name: 'Lucie',
            email: 'lucie@test.fr',
          },
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
    const id: FindByUuidDto = { id: 'msg-42' };
    const updateDto: UpdateMessageDto = { content: 'Contenu mis à jour' };

    const updatedMessage: Message = {
      id: id.id,
      content: updateDto.content,
      ai: false,
      createdAt: new Date(),
      discussion: {
        id: 'disc-1',
        title: 'Discussion',
        createdAt: new Date(),
        initializedBy: {
          id: 'user-1',
          name: 'Jean',
          email: 'jean@email.com',
        },
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
