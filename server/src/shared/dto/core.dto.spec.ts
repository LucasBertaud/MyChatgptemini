import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindByUuidDto } from './find-by-uuid.dto';

describe('Core DTOs', () => {
  it('should fail on invalid ID DTO', async () => {
    const idObject = { id: -1 };
    const findByIdDto = plainToInstance(FindByUuidDto, idObject);
    const errors = await validate(findByIdDto);
    expect(errors.length).not.toBe(0);
    expect(JSON.stringify(errors)).toContain(`id must be a UUID`);
  });
});
