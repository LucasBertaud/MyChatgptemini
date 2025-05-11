import { FindByUuidDto } from '../../../shared/dto/find-by-uuid.dto';
import { CreateDiscussionDto } from '../dto/create-discussion.dto';
import { UpdateDiscussionDto } from '../dto/update-discussion.dto';
import { Discussion } from '../entities/discussion.entity';
import { User } from '../../../domain/user/entities/user.entity';

export interface DiscussionRepository {
  findById(id: FindByUuidDto): Promise<Discussion | null>;
  findByUser(userId: string): Promise<Discussion[]>;
  create(discussion: CreateDiscussionDto, user: User): Promise<Discussion>;
  update(
    id: FindByUuidDto,
    discussion: UpdateDiscussionDto,
  ): Promise<Discussion>;
  delete(id: FindByUuidDto): Promise<void>;
}
