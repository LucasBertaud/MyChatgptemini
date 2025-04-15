import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from './repositories/user.repository';
import { User } from './entities/user.entity';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.create(user);
  }

  async findById(id: FindUserByIdDto): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: FindUserByEmailDto): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: FindUserByIdDto, user: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async remove(id: FindUserByIdDto): Promise<void> {
    await this.userRepository.delete(id);
  }
}
