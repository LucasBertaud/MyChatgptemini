import { Discussion } from '../../../../domain/discussion/entities/discussion.entity';
import { User } from '../../../../domain/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TypeOrmUserModel } from './user.model';
import { Message } from '../../../../domain/message/entities/message.entity';
import { TypeOrmMessageModel } from './message.model';

@Entity('discussions')
export class TypeOrmDiscussionModel implements Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => TypeOrmUserModel, (user) => user.discussions, {
    nullable: false,
  })
  initializedBy: User;
  @OneToMany(() => TypeOrmMessageModel, (message) => message.discussion)
  messages?: Message[];
}
