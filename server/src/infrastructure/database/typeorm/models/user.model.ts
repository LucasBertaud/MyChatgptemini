import { User } from 'src/features/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class TypeOrmUserModel implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
}
