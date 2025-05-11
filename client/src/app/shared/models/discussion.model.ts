import { Message } from './message.model';
import { User } from './user.model';

export interface Discussion {
  id: string;
  title: string;
  createdAt: Date;
  initializedBy: User;
  updatedAt: Date;
  messages?: Message[];
}
