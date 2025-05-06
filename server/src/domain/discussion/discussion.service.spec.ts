import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { DiscussionRepository } from './repositories/discussion.repository';
import { Discussion } from './entities/discussion.entity';
import { User } from '../user/entities/user.entity';
import { FindByUuidDto } from 'src/shared/dto/find-by-uuid.dto';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';

describe('DiscussionService', () => {
  let service: DiscussionService;
  const mockDiscussionRepository: jest.Mocked<DiscussionRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUser: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscussionService,
        {
          provide: INJECTION_TOKENS.DISCUSSION_REPOSITORY,
          useValue: mockDiscussionRepository,
        },
      ],
    }).compile();

    service = module.get<DiscussionService>(DiscussionService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a discussion', async () => {
    const createDiscussionDto: CreateDiscussionDto = {
      title: 'Test Discussion Create',
    };

    const user: User = {
      email: 'johndoe@gmail.com',
      name: 'JohnDoe',
      id: 'dadf-1234-5678-90ab-cdef12345678',
    };

    const createdDiscussion: Discussion = {
      id: '1',
      createdAt: new Date(),
      initializedBy: user,
      ...createDiscussionDto,
    };

    mockDiscussionRepository.create.mockResolvedValue(createdDiscussion);

    const result = await service.create(createDiscussionDto);

    expect(result).toBeDefined();
    expect(result.title).toBe(createDiscussionDto.title);
    expect(result.id).toBe('1');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.initializedBy.email).toBe(user.email);
  });

  it('should find a discussion by id', async () => {
    const id: FindByUuidDto = { id: 'abc-123' };
    const discussion: Discussion = {
      id: id.id,
      title: 'Some Discussion',
      createdAt: new Date(),
      initializedBy: {
        email: 'someone@email.com',
        id: 'u1',
        name: 'Someone',
      },
    };

    mockDiscussionRepository.findById.mockResolvedValue(discussion);

    const result = await service.findById(id);

    expect(mockDiscussionRepository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(discussion);
  });

  it('should find discussions by user', async () => {
    const userId: FindByUuidDto = { id: 'user-123' };
    const discussions: Discussion[] = [
      {
        id: 'd1',
        title: 'Discussion 1',
        createdAt: new Date(),
        initializedBy: {
          id: userId.id,
          email: 'a@a.com',
          name: 'TestUser',
        },
      },
    ];

    mockDiscussionRepository.findByUser.mockResolvedValue(discussions);

    const result = await service.findByUser(userId);

    expect(mockDiscussionRepository.findByUser).toHaveBeenCalledWith(userId);
    expect(result).toEqual(discussions);
  });

  it('should update a discussion', async () => {
    const id: FindByUuidDto = { id: 'update-123' };
    const updateDto: UpdateDiscussionDto = { title: 'Updated Title' };
    const updatedDiscussion: Discussion = {
      id: id.id,
      title: updateDto.title,
      createdAt: new Date(),
      initializedBy: {
        id: 'user-1',
        name: 'Someone',
        email: 's@e.com',
      },
    };

    mockDiscussionRepository.update.mockResolvedValue(updatedDiscussion);

    const result = await service.update(id, updateDto);

    expect(mockDiscussionRepository.update).toHaveBeenCalledWith(id, updateDto);
    expect(result.title).toBe(updateDto.title);
  });

  it('should remove a discussion', async () => {
    const id: FindByUuidDto = { id: 'remove-123' };

    mockDiscussionRepository.delete.mockResolvedValue(null);

    await service.remove(id);

    expect(mockDiscussionRepository.delete).toHaveBeenCalledWith(id);
  });
});
