import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { REQUEST } from '@nestjs/core';

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository: UserRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockRequest = {
    user: { sub: 'mock-user-id' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: INJECTION_TOKENS.USER_REPOSITORY,
          useValue: mockUserRepository,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.findById).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.remove).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      id: mockRequest.user.sub,
    };

    const createdUser: User = {
      ...createUserDto,
    };

    (mockUserRepository.create as jest.Mock).mockResolvedValue(createdUser);
    const result = await service.create(createUserDto);

    expect(result).toBeDefined();
    expect(result.id).toContain(createUserDto.id);
    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should get the current user', async () => {
    const userId = mockRequest.user.sub;
    const user: User = {
      id: userId,
    };

    (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);

    const result = await service.getCurrentUser();

    expect(mockUserRepository.findById).toHaveBeenCalledWith({
      id: userId,
    });
    expect(result).toEqual(user);
  });

  it('should find a user by id', async () => {
    const user: User = {
      id: '123',
    };
    const findUserByIdDto: FindByUuidDto = {
      id: user.id,
    };

    (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);

    const result = await service.findById(findUserByIdDto);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(findUserByIdDto);
    expect(result).toEqual(user);
  });

  it('should return null if user is not found with id', async () => {
    const findUserByIdDto: FindByUuidDto = {
      id: 'not-exist-id',
    };

    (mockUserRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await service.findById(findUserByIdDto);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(findUserByIdDto);
    expect(result).toBeNull();
  });

  it('should update a user', async () => {
    const existingUser: User = {
      id: 'old-id-123',
    };

    const updateUserDto: UpdateUserDto = {
      id: 'new-id-123',
    };

    const findUserByIdDto: FindByUuidDto = {
      id: existingUser.id,
    };

    const updatedUser: User = {
      ...existingUser,
      ...updateUserDto,
    };

    (mockUserRepository.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await service.update(findUserByIdDto, updateUserDto);

    expect(mockUserRepository.update).toHaveBeenCalledWith(
      findUserByIdDto,
      updateUserDto,
    );
    expect(result).toEqual(updatedUser);
  });

  it('should remove a user', async () => {
    const findUserByIdDto: FindByUuidDto = {
      id: 'delete-id-123',
    };

    (mockUserRepository.delete as jest.Mock).mockResolvedValue(null);

    await service.remove(findUserByIdDto);

    expect(mockUserRepository.delete).toHaveBeenCalledWith(findUserByIdDto);
  });
});
