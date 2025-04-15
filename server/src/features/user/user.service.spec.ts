import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from './repositories/user.repository';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

describe('UserService', () => {
  let service: UserService;
  let createUserDto: CreateUserDto;
  let updateUserDto: UpdateUserDto;
  let findUserByIdDto: FindUserByIdDto;
  let findUserByEmailDto: FindUserByEmailDto;

  const mockUserRepository: UserRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    createUserDto = {
      email: '',
      name: '',
    };
    updateUserDto = {
      email: '',
      name: '',
    };
    findUserByIdDto = {
      id: '',
    };
    findUserByEmailDto = {
      email: '',
    };

    jest.clearAllMocks();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.findById).toBeDefined();
    expect(service.findByEmail).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.remove).toBeDefined();
  });

  it('should create a user', async () => {
    createUserDto = {
      email: 'johndoe@gmail.com',
      name: 'JohnDoe',
    };

    const createdUser: User = {
      id: '2',
      ...createUserDto,
    };

    (mockUserRepository.create as jest.Mock).mockResolvedValue(createdUser);
    const result = await service.create(createUserDto);

    expect(result).toBeDefined();
    expect(result.email).toBe(createUserDto.email);
    expect(result.name).toBe(createUserDto.name);
    expect(result.id).toContain('2');
    expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should find a user by id', async () => {
    const user: User = {
      id: '123',
      email: 'john@example.com',
      name: 'John',
    };
    findUserByIdDto = {
      id: user.id,
    };

    (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);

    const result = await service.findById(findUserByIdDto);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(findUserByIdDto);
    expect(result).toEqual(user);
  });

  it('should return null if user is not found with id', async () => {
    findUserByIdDto = {
      id: 'not-exist-id',
    };

    (mockUserRepository.findById as jest.Mock).mockResolvedValue(null);

    const result = await service.findById(findUserByIdDto);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(findUserByIdDto);
    expect(result).toBeNull();
  });

  it('should find a user by email', async () => {
    const user: User = {
      id: '72',
      email: 'mock@email.org',
      name: 'MockName',
    };
    findUserByEmailDto = {
      email: user.email,
    };

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(user);

    const result = await service.findByEmail(findUserByEmailDto);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      findUserByEmailDto,
    );
    expect(result).toEqual(user);
  });

  it('should return null if user is not found with email', async () => {
    findUserByEmailDto = {
      email: 'not-exist@gmail.com',
    };

    (mockUserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    const result = await service.findByEmail(findUserByEmailDto);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      findUserByEmailDto,
    );
    expect(result).toBeNull();
  });

  it('should update a user', async () => {
    const existingUser: User = {
      id: '99',
      email: 'old@email.com',
      name: 'OldName',
    };

    updateUserDto = {
      email: 'new@email.com',
      name: 'NewName',
    };

    findUserByIdDto = {
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
    findUserByIdDto = {
      id: 'delete-id-123',
    };

    (mockUserRepository.delete as jest.Mock).mockResolvedValue(null);

    await service.remove(findUserByIdDto);

    expect(mockUserRepository.delete).toHaveBeenCalledWith(findUserByIdDto);
  });
});
