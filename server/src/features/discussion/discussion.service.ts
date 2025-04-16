import { Inject, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import {
  DISCUSSION_REPOSITORY,
  DiscussionRepository,
} from './repositories/discussion.repository';
import { FindByUuidDto } from 'src/core/dto/find-by-uuid.dto';

@Injectable()
export class DiscussionService {
  constructor(
    @Inject(DISCUSSION_REPOSITORY)
    private readonly repository: DiscussionRepository,
  ) {}

  create(discussion: CreateDiscussionDto): Promise<Discussion> {
    return this.repository.create(discussion);
  }

  findByUser(userId: FindByUuidDto): Promise<Discussion[]> {
    return this.repository.findByUser(userId);
  }

  findById(id: FindByUuidDto): Promise<Discussion | null> {
    return this.repository.findById(id);
  }

  update(id: FindByUuidDto, discussion: UpdateDiscussionDto) {
    return this.repository.update(id, discussion);
  }

  remove(id: FindByUuidDto) {
    return this.repository.delete(id);
  }
}
