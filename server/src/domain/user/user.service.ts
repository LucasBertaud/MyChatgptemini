import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindByUuidDto } from 'src/shared/dto/find-by-uuid.dto';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.repository.create(user);
  }

  async findById(id: FindByUuidDto): Promise<User | null> {
    return this.repository.findById(id);
  }

  async findByEmail(email: FindUserByEmailDto): Promise<User | null> {
    return this.repository.findByEmail(email);
  }

  async update(id: FindByUuidDto, user: UpdateUserDto): Promise<User> {
    return this.repository.update(id, user);
  }

  async remove(id: FindByUuidDto): Promise<void> {
    await this.repository.delete(id);
  }
}
