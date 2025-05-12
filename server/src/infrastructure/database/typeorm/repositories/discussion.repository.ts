import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DiscussionRepository } from '../../../../domain/discussion/repositories/discussion.repository';
import { TypeOrmDiscussionModel } from '../models/discussion.model';
import { Discussion } from '../../../../domain/discussion/entities/discussion.entity';
import { CreateDiscussionDto } from '../../../../domain/discussion/dto/create-discussion.dto';
import { UpdateDiscussionDto } from '../../../../domain/discussion/dto/update-discussion.dto';
import { FindByUuidDto } from '../../../../shared/dto/find-by-uuid.dto';
import { User } from '../../../../domain/user/entities/user.entity';

@Injectable()
export class TypeOrmDiscussionRepository implements DiscussionRepository {
  constructor(
    @InjectRepository(TypeOrmDiscussionModel)
    private repository: Repository<TypeOrmDiscussionModel>,
  ) {}

  async findById(id: FindByUuidDto): Promise<Discussion | null> {
    return this.repository.findOneBy(id);
  }

  async findByUser(userId: string): Promise<Discussion[]> {
    return this.repository.find({
      where: { initializedBy: { id: userId } },
      order: { updatedAt: 'DESC' },
    });
  }

  async create(
    discussion: CreateDiscussionDto,
    user: User,
  ): Promise<Discussion> {
    const entity = this.repository.create({
      ...discussion,
      initializedBy: user,
    });
    return this.repository.save(entity);
  }

  async update(
    id: FindByUuidDto,
    discussion: UpdateDiscussionDto,
  ): Promise<Discussion> {
    const entity = await this.repository.update(id, discussion);
    if (entity.affected === 0) {
      throw new Error('Entity not found');
    }
    return this.repository.findOneBy(id);
  }

  async delete(id: FindByUuidDto): Promise<void> {
    await this.repository.delete(id);
  }
}
