import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule.register(process.env)],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
