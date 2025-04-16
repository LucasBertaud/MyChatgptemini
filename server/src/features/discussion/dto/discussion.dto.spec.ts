import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateDiscussionDto } from './create-discussion.dto';
import { UpdateDiscussionDto } from './update-discussion.dto';

describe('DiscussionDTO', () => {
  it('should fail on invalid create discussion DTO', async () => {
    const invalidDiscussion = {
      title: undefined,
    };
    const createDiscussionDto = plainToInstance(
      CreateDiscussionDto,
      invalidDiscussion,
    );
    const errors = await validate(createDiscussionDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('title must be a string');
  });

  it('should fail on invalid update discussion DTO', async () => {
    const invalidUpdate = { title: 123 };
    const updateDiscussionDto = plainToInstance(
      UpdateDiscussionDto,
      invalidUpdate,
    );
    const errors = await validate(updateDiscussionDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('title must be a string');
  });
});
