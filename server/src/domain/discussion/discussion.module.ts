import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule.register(process.env), UserModule],
  controllers: [DiscussionController],
  providers: [DiscussionService],
  exports: [DiscussionService],
})
export class DiscussionModule {}
