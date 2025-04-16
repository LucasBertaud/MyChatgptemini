import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../core/dto/find-by-uuid.dto';
import {
  MESSAGE_REPOSITORY,
  MessageRepository,
} from './repositories/message.repository';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly repository: MessageRepository,
  ) {}

  create(message: CreateMessageDto) {
    return this.repository.create(message);
  }

  findByDiscussion(discussionId: FindByUuidDto) {
    return this.repository.findByDiscussion(discussionId);
  }

  findById(id: FindByUuidDto) {
    return this.repository.findById(id);
  }

  update(id: FindByUuidDto, message: UpdateMessageDto) {
    return this.repository.update(id, message);
  }

  remove(id: FindByUuidDto) {
    return this.repository.delete(id);
  }
}
