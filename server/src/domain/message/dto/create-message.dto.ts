import { IsBoolean, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
  @IsBoolean()
  ai: boolean;
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  discussionId: string | null;
}
