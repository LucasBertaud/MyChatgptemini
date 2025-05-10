import { CreateUserDto } from '../dto/create-user.dto';
import { FindByUserIdDto } from '../dto/find-by-user-id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: FindByUserIdDto): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: FindByUserIdDto, user: UpdateUserDto): Promise<User>;
  delete(id: FindByUserIdDto): Promise<void>;
}
