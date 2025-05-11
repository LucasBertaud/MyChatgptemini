import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() message: CreateMessageDto) {
    return this.messageService.create(message);
  }

  @Get('discussion/:id')
  findByDiscussion(@Param('id') id: string) {
    return this.messageService.findByDiscussion(id);
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
