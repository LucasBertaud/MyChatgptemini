import { FindByUuidDto } from 'src/core/dto/find-by-uuid.dto';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';

export interface MessageRepository {
  findById(id: FindByUuidDto): Promise<Message | null>;
  findByDiscussion(discussionId: FindByUuidDto): Promise<Message[]>;
  create(message: CreateMessageDto): Promise<Message>;
  update(id: FindByUuidDto, message: UpdateMessageDto): Promise<Message>;
  delete(id: FindByUuidDto): Promise<void>;
}

export const MESSAGE_REPOSITORY = Symbol('MessageRepository');
