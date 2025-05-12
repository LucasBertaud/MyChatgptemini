export class CreateMessageDto {
  content: string;
  ai: boolean;
  discussionId: string | null;
}
