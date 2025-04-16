import { Message } from 'src/features/message/entities/message.entity';
import { User } from 'src/features/user/entities/user.entity';

export interface Discussion {
  id: string;
  title: string;
  createdAt: Date;
  initializedBy: User;
  messages?: Message[];
}
