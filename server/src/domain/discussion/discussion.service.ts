import { Inject, Injectable } from '@nestjs/common';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import { DiscussionRepository } from './repositories/discussion.repository';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { UserService } from '../user/user.service';

@Injectable()
export class DiscussionService {
  constructor(
    @Inject(INJECTION_TOKENS.DISCUSSION_REPOSITORY)
    private readonly repository: DiscussionRepository,
    private readonly userService: UserService,
  ) {}

  async create(discussion: CreateDiscussionDto): Promise<Discussion> {
    const user = await this.userService.getCurrentUser();
    return this.repository.create(discussion, user);
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
