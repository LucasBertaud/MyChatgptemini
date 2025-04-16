import { FindByUuidDto } from 'src/core/dto/find-by-uuid.dto';
import { CreateDiscussionDto } from '../dto/create-discussion.dto';
import { UpdateDiscussionDto } from '../dto/update-discussion.dto';
import { Discussion } from '../entities/discussion.entity';

export interface DiscussionRepository {
  findById(id: FindByUuidDto): Promise<Discussion | null>;
  findByUser(userId: FindByUuidDto): Promise<Discussion[]>;
  create(discussion: CreateDiscussionDto): Promise<Discussion>;
  update(
    id: FindByUuidDto,
    discussion: UpdateDiscussionDto,
  ): Promise<Discussion>;
  delete(id: FindByUuidDto): Promise<void>;
}

export const DISCUSSION_REPOSITORY = Symbol('DiscussionRepository');
