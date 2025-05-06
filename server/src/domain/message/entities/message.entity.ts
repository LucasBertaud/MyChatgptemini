import { Discussion } from 'src/domain/discussion/entities/discussion.entity';

export interface Message {
  id: string;
  content: string;
  ai: boolean;
  discussion: Discussion;
  createdAt: Date;
}
