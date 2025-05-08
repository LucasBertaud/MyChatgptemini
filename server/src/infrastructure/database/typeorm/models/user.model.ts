import { Discussion } from '../../../../domain/discussion/entities/discussion.entity';
import { User } from '../../../../domain/user/entities/user.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TypeOrmDiscussionModel } from './discussion.model';

@Entity('users')
export class TypeOrmUserModel implements User {
  @PrimaryColumn()
  id: string;
  @OneToMany(
    () => TypeOrmDiscussionModel,
    (discussion) => discussion.initializedBy,
  )
  discussions: Discussion[];
}
