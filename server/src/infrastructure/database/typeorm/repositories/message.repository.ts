import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmMessageModel } from '../models/message.model';
import { Repository } from 'typeorm';
import { FindByUuidDto } from '../../../../shared/dto/find-by-uuid.dto';
import { Message } from '../../../../domain/message/entities/message.entity';
import { MessageRepository } from '../../../../domain/message/repositories/message.repository';
import { CreateMessageDto } from '../../../../domain/message/dto/create-message.dto';
import { UpdateMessageDto } from '../../../../domain/message/dto/update-message.dto';

@Injectable()
export class TypeOrmMessageRepository implements MessageRepository {
  constructor(
    @InjectRepository(TypeOrmMessageModel)
    private readonly repository: Repository<TypeOrmMessageModel>,
  ) {}

  async findById(id: FindByUuidDto): Promise<Message | null> {
    return this.repository.findOneBy(id);
  }

  async findByDiscussion(discussionId: string): Promise<Message[]> {
    return this.repository.findBy({
      discussion: {
        id: discussionId,
      },
    });
  }

  async create(message: CreateMessageDto): Promise<Message> {
    const entity = this.repository.create({
      content: message.content,
      ai: message.ai,
      discussion: { id: message.discussionId },
    });
    return this.repository.save(entity);
  }

  async update(id: FindByUuidDto, message: UpdateMessageDto): Promise<Message> {
    const entity = await this.repository.update(id, message);
    if (entity.affected === 0) {
      throw new Error('Entity not found');
    }
    return this.repository.findOneBy(id);
  }

  async delete(id: FindByUuidDto): Promise<void> {
    await this.repository.delete(id);
  }
}
