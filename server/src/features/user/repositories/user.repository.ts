import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserByEmailDto } from '../dto/find-user-by-email.dto';
import { FindUserByIdDto } from '../dto/find-user-by-id.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  findById(id: FindUserByIdDto): Promise<User | null>;
  findByEmail(email: FindUserByEmailDto): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: FindUserByIdDto, user: UpdateUserDto): Promise<User>;
  delete(id: FindUserByIdDto): Promise<void>;
}

export const USER_REPOSITORY = Symbol('UserRepository');
