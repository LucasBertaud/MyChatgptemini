import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../../../../domain/user/dto/create-user.dto';
import { UpdateUserDto } from '../../../../domain/user/dto/update-user.dto';
import { User } from '../../../../domain/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TypeOrmUserModel } from '../models/user.model';
import { UserRepository } from '../../../../domain/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { FindByUserIdDto } from '../../../../domain/user/dto/find-by-user-id.dto';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserModel)
    private repository: Repository<TypeOrmUserModel>,
  ) {}

  async findById(id: FindByUserIdDto): Promise<User | null> {
    return this.repository.findOneBy(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    const entity = this.repository.create(user);
    return this.repository.save(entity);
  }

  async update(id: FindByUserIdDto, user: UpdateUserDto): Promise<User> {
    const entity = await this.repository.update(id, user);
    if (entity.affected === 0) {
      throw new Error('Entity not found');
    }
    return this.repository.findOneBy(id);
  }

  async delete(id: FindByUserIdDto): Promise<void> {
    await this.repository.delete(id);
  }
}
