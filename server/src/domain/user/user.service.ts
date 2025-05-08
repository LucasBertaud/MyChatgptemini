import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { FindByUserIdDto } from './dto/find-by-user-id.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UserService {
  constructor(
    @Inject(INJECTION_TOKENS.USER_REPOSITORY)
    private readonly repository: UserRepository,
    @Inject(REQUEST)
    private readonly request: {
      user: {
        sub: string;
      };
    },
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.repository.create(user);
  }

  async getCurrentUser(): Promise<User> {
    const userId: string = this.request.user.sub;

    let user = await this.repository.findById({
      id: userId,
    });

    if (!user) {
      user = await this.repository.create({
        id: userId,
      });
    }

    return user;
  }

  async findById(id: FindByUserIdDto): Promise<User | null> {
    return this.repository.findById(id);
  }

  async update(id: FindByUserIdDto, user: UpdateUserDto): Promise<User> {
    return this.repository.update(id, user);
  }

  async remove(id: FindByUserIdDto): Promise<void> {
    await this.repository.delete(id);
  }
}
