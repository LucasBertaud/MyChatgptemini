import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { MessageRepository } from './repositories/message.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { AiService } from '../ai/ai.service';
import { DiscussionService } from '../discussion/discussion.service';
import { Discussion } from '../discussion/entities/discussion.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject(INJECTION_TOKENS.MESSAGE_REPOSITORY)
    private readonly repository: MessageRepository,
    private readonly aiService: AiService,
    private readonly discussionService: DiscussionService,
  ) {}

  async create(message: CreateMessageDto) {
    if (!message.discussionId) {
      const aiResponseTitle: string = await this.aiService.generateTitle(
        message.content,
      );
      const newDiscussion: Discussion = await this.discussionService.create({
        title: aiResponseTitle,
      });
      message.discussionId = newDiscussion.id;
    }

    await this.repository.create(message);

    const aiResponse = await this.aiService.generateResponse(message.content);
    const messageFromAi = await this.repository.create({
      content: aiResponse,
      ai: true,
      discussionId: message.discussionId,
    });

    return messageFromAi;
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
