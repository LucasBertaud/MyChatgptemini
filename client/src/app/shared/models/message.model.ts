import { Discussion } from './discussion.model';

export interface Message {
  id: string;
  content: string;
  ai: boolean;
  discussion: Discussion;
  createdAt: Date;
}
