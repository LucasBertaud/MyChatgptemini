import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../core/dto/find-by-uuid.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() message: CreateMessageDto) {
    return this.messageService.create(message);
  }

  @Get('discussion/:id')
  findByDiscussion(@Param('id') discussionId: FindByUuidDto) {
    return this.messageService.findByDiscussion(discussionId);
  }

  @Get(':id')
  findById(@Param('id') id: FindByUuidDto) {
    return this.messageService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: FindByUuidDto, @Body() message: UpdateMessageDto) {
    return this.messageService.update(id, message);
  }

  @Delete(':id')
  remove(@Param('id') id: FindByUuidDto) {
    return this.messageService.remove(id);
  }
}
