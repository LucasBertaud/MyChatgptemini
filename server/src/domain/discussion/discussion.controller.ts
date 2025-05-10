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
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post()
  create(@Body() discussion: CreateDiscussionDto) {
    return this.discussionService.create(discussion);
  }

  @Get('user/:id')
  findByUser(@Param('id') userId: FindByUuidDto) {
    return this.discussionService.findByUser(userId);
  }

  @Get(':id')
  findById(@Param('id') id: FindByUuidDto) {
    return this.discussionService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: FindByUuidDto,
    @Body() discussion: UpdateDiscussionDto,
  ) {
    return this.discussionService.update(id, discussion);
  }

  @Delete(':id')
  remove(@Param('id') id: FindByUuidDto) {
    return this.discussionService.remove(id);
  }
}
