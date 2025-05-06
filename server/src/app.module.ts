import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { DiscussionModule } from './domain/discussion/discussion.module';
import { MessageModule } from './domain/message/message.module';
import { AuthModule } from './infrastructure/auth/auth.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, DiscussionModule, MessageModule, AuthModule],
})
export class AppModule {}
