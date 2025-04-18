import { Message } from 'src/domain/message/entities/message.entity';
import { User } from 'src/domain/user/entities/user.entity';

export interface Discussion {
  id: string;
  title: string;
  createdAt: Date;
  initializedBy: User;
  messages?: Message[];
}
