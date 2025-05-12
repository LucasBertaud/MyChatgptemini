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

    const messageCreated = await this.repository.create(message);

    await this.discussionService.update(
      { id: messageCreated.discussion.id },
      {
        updatedAt: new Date(),
      },
    );

    const aiResponse = await this.aiService.generateResponse(message.content);
    const messageFromAi = await this.repository.create({
      content: aiResponse,
      ai: true,
      discussionId: message.discussionId,
    });

    return {
      ai: messageFromAi,
      user: message,
    };
  }

  findByDiscussion(discussionId: string) {
    return this.repository.findByDiscussion(discussionId);
  }

  findById(id: FindByUuidDto) {
    return this.repository.findById(id);
  }

  async update(id: string, message: UpdateMessageDto) {
    // Update AI message based with user message
    if (!message.ai && message.content) {
      const aiResponse = await this.aiService.generateResponse(message.content);
      return this.repository.update(id, {
        content: aiResponse,
      });
    } else {
      return this.repository.update(id, message);
    }
  }

  remove(id: FindByUuidDto) {
    return this.repository.delete(id);
  }
}
