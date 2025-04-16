import { Discussion } from 'src/features/discussion/entities/discussion.entity';
import { User } from 'src/features/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeOrmUserModel } from './user.model';

@Entity('discussions')
export class TypeOrmDiscussionModel implements Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => TypeOrmUserModel, (user) => user.discussions)
  initializedBy: User;
}
