import { Discussion } from 'src/domain/discussion/entities/discussion.entity';
import { User } from 'src/domain/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TypeOrmDiscussionModel } from './discussion.model';

@Entity('users')
export class TypeOrmUserModel implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @OneToMany(
    () => TypeOrmDiscussionModel,
    (discussion) => discussion.initializedBy,
  )
  discussions: Discussion[];
}
