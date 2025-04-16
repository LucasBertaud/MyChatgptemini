import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/features/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/features/user/dto/update-user.dto';
import { User } from 'src/features/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TypeOrmUserModel } from '../models/user.model';
import { UserRepository } from 'src/features/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { FindUserByEmailDto } from 'src/features/user/dto/find-user-by-email.dto';
import { FindByUuidDto } from 'src/core/dto/find-by-uuid.dto';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserModel)
    private repository: Repository<TypeOrmUserModel>,
  ) {}

  async findById(id: FindByUuidDto): Promise<User | null> {
    return this.repository.findOneBy(id);
  }

  async findByEmail(email: FindUserByEmailDto): Promise<User | null> {
    return this.repository.findOneBy(email);
  }

  async create(user: CreateUserDto): Promise<User> {
    const entity = this.repository.create(user);
    return this.repository.save(entity);
  }

  async update(id: FindByUuidDto, user: UpdateUserDto): Promise<User> {
    const entity = await this.repository.update(id, user);
    if (entity.affected === 0) {
      throw new Error('Entity not found');
    }
    return this.repository.findOneBy(id);
  }

  async delete(id: FindByUuidDto): Promise<void> {
    await this.repository.delete(id);
  }
}
