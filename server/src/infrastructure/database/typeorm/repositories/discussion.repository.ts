import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DiscussionRepository } from 'src/domain/discussion/repositories/discussion.repository';
import { TypeOrmDiscussionModel } from '../models/discussion.model';
import { Discussion } from 'src/domain/discussion/entities/discussion.entity';
import { CreateDiscussionDto } from 'src/domain/discussion/dto/create-discussion.dto';
import { UpdateDiscussionDto } from 'src/domain/discussion/dto/update-discussion.dto';
import { FindByUuidDto } from 'src/shared/dto/find-by-uuid.dto';

@Injectable()
export class TypeOrmDiscussionRepository implements DiscussionRepository {
  constructor(
    @InjectRepository(TypeOrmDiscussionModel)
    private repository: Repository<TypeOrmDiscussionModel>,
  ) {}

  async findById(id: FindByUuidDto): Promise<Discussion | null> {
    return this.repository.findOneBy(id);
  }

  async findByUser(userId: FindByUuidDto): Promise<Discussion[]> {
    return this.repository.findBy({ initializedBy: userId });
  }

  async create(discussion: CreateDiscussionDto): Promise<Discussion> {
    const entity = this.repository.create(discussion);
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
