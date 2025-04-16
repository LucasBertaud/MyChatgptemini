import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionController } from './discussion.controller';
import { DiscussionService } from './discussion.service';
import {
  DISCUSSION_REPOSITORY,
  DiscussionRepository,
} from './repositories/discussion.repository';

describe('DiscussionController', () => {
  let controller: DiscussionController;
  const mockDiscussionRepository: DiscussionRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUser: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionController],
      providers: [
        DiscussionService,
        {
          provide: DISCUSSION_REPOSITORY,
          useValue: mockDiscussionRepository,
        },
      ],
    }).compile();

    controller = module.get<DiscussionController>(DiscussionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
