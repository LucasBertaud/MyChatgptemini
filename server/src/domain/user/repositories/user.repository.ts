import { FindByUuidDto } from 'src/shared/dto/find-by-uuid.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserByEmailDto } from '../dto/find-user-by-email.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: FindByUuidDto): Promise<User | null>;
  findByEmail(email: FindUserByEmailDto): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: FindByUuidDto, user: UpdateUserDto): Promise<User>;
  delete(id: FindByUuidDto): Promise<void>;
}
