import { Message } from '../../../domain/message/entities/message.entity';
import { User } from '../../../domain/user/entities/user.entity';

export interface Discussion {
  id: string;
  title: string;
  createdAt: Date;
  initializedBy: User;
  messages?: Message[];
}
