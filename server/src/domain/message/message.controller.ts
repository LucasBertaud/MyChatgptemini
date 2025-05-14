import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { AuthGuard } from '@nestjs/passport';
import { Options } from 'src/shared/types/options.type';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() message: CreateMessageDto) {
    return this.messageService.create(message);
  }

  @Get('discussion/:id')
  findByDiscussion(
    @Param('id') id: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    const options: Options = {
      offset,
      limit,
    };
    return this.messageService.findByDiscussion(id, options);
  }

  @Get(':id')
  findById(@Param('id') id: FindByUuidDto) {
    return this.messageService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() message: UpdateMessageDto) {
    return this.messageService.update(id, message);
  }

  @Delete(':id')
  remove(@Param('id') id: FindByUuidDto) {
    return this.messageService.remove(id);
  }
}
