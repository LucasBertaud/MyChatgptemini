import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindUserByEmailDto } from './find-user-by-email.dto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

describe('UserDTO', () => {
  it('should fail on invalid email DTO', async () => {
    const emailObject = { email: 'azerty' };
    const findByEmailDto = plainToInstance(FindUserByEmailDto, emailObject);
    const errors = await validate(findByEmailDto);
    expect(JSON.stringify(errors)).toContain(`email must be an email`);
  });

  it('should fail on invalid create user DTO', async () => {
    const invalidUser = { name: '', email: 'not-an-email' };
    const createUserDto = plainToInstance(CreateUserDto, invalidUser);
    const errors = await validate(createUserDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('name should not be empty');
    expect(JSON.stringify(errors)).toContain('email must be an email');
  });

  it('should fail on invalid update user DTO', async () => {
    const invalidUpdate = { name: 123, email: 'invalid' };
    const updateUserDto = plainToInstance(UpdateUserDto, invalidUpdate);
    const errors = await validate(updateUserDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('name must be a string');
    expect(JSON.stringify(errors)).toContain('email must be an email');
  });
});
