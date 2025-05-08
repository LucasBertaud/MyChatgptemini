import { Discussion } from '../../../../domain/discussion/entities/discussion.entity';
import { Message } from '../../../../domain/message/entities/message.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeOrmDiscussionModel } from './discussion.model';

@Entity('messages')
export class TypeOrmMessageModel implements Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  ai: boolean;
  @Column()
  content: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(
    () => TypeOrmDiscussionModel,
    (discussion) => discussion.messages,
    {
      nullable: false,
    },
  )
  discussion: Discussion;
}
