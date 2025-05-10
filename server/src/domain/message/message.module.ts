import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { AiModule } from '../ai/ai.module';
import { DiscussionModule } from '../discussion/discussion.module';

@Module({
  imports: [DatabaseModule.register(process.env), AiModule, DiscussionModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
