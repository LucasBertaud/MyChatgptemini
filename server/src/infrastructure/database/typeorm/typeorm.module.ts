import { Global, Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { TypeOrmUserModel } from './models/user.model';
import { USER_REPOSITORY } from 'src/features/user/repositories/user.repository';
import { TypeOrmDiscussionRepository } from './repositories/discussion.repository';
import { DISCUSSION_REPOSITORY } from 'src/features/discussion/repositories/discussion.repository';
import { TypeOrmDiscussionModel } from './models/discussion.model';
import { MESSAGE_REPOSITORY } from 'src/features/message/repositories/message.repository';
import { TypeOrmMessageModel } from './models/message.model';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrm.forRoot(typeormConfig()),
    TypeOrm.forFeature([
      TypeOrmUserModel,
      TypeOrmDiscussionModel,
      TypeOrmMessageModel,
    ]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    {
      provide: DISCUSSION_REPOSITORY,
      useClass: TypeOrmDiscussionRepository,
    },
    {
      provide: MESSAGE_REPOSITORY,
      useClass: TypeOrmDiscussionRepository,
    },
  ],
  exports: [USER_REPOSITORY, DISCUSSION_REPOSITORY, MESSAGE_REPOSITORY],
})
export class TypeOrmModule {}
