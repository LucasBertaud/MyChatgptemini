import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';
import { UpdateMessageDto } from './update-message.dto';

describe('MessageDTO', () => {
  it('should fail on invalid create message DTO', async () => {
    const invalidMessage = {
      content: undefined,
      ai: 54,
      discussionId: 123,
    };
    const createMessageDto = plainToInstance(CreateMessageDto, invalidMessage);
    const errors = await validate(createMessageDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('content must be a string');
    expect(JSON.stringify(errors)).toContain('ai must be a boolean value');
    expect(JSON.stringify(errors)).toContain('discussionId must be a UUID');
  });

  it('should fail on invalid update message DTO', async () => {
    const invalidUpdate = {
      content: 42,
      ai: 'not-a-boolean',
      discussionId: 'uuid',
    };
    const updateMessageDto = plainToInstance(UpdateMessageDto, invalidUpdate);
    const errors = await validate(updateMessageDto);

    expect(errors.length).toBeGreaterThan(0);
    expect(JSON.stringify(errors)).toContain('content must be a string');
    expect(JSON.stringify(errors)).toContain('ai must be a boolean value');
    expect(JSON.stringify(errors)).toContain('discussionId must be a UUID');
  });
});
