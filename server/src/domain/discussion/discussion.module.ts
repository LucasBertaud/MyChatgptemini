import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule.register(process.env)],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
