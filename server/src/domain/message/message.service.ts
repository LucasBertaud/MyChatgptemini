import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { MessageRepository } from './repositories/message.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';

@Injectable()
export class MessageService {
  constructor(
    @Inject(INJECTION_TOKENS.MESSAGE_REPOSITORY)
    private readonly repository: MessageRepository,
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
