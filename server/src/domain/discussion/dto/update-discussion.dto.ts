import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscussionDto } from './create-discussion.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
