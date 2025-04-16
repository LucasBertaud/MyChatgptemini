import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { DiscussionModule } from './features/discussion/discussion.module';
import { MessageModule } from './features/message/message.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, DatabaseModule, DiscussionModule, MessageModule],
})
export class AppModule {}
