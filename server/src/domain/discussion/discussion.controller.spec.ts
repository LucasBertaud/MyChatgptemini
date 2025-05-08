import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionController } from './discussion.controller';
import { DiscussionService } from './discussion.service';
import { DiscussionRepository } from './repositories/discussion.repository';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { UserService } from '../user/user.service';

describe('DiscussionController', () => {
  let controller: DiscussionController;
  const mockDiscussionRepository: DiscussionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUser: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserService = {
    getCurrentUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionController],
      providers: [
        DiscussionService,
        {
          provide: INJECTION_TOKENS.DISCUSSION_REPOSITORY,
          useValue: mockDiscussionRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<DiscussionController>(DiscussionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
