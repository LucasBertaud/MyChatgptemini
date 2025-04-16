import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
  @IsBoolean()
  ai: boolean;
  @IsUUID()
  discussionId: string;
}
