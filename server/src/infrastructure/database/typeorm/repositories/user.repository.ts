import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/features/user/dto/update-user.dto';
import { User } from 'src/features/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TypeOrmUserModel } from '../models/user.model';
import { UserRepository } from 'src/features/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserModel)
    private userRepository: Repository<TypeOrmUserModel>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const updateUser = await this.userRepository.update(id, user);
    if (updateUser.affected === 0) {
      throw new Error('User not found');
    }
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}
