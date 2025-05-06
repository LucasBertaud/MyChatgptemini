import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserModel } from './models/user.model';
import { TypeOrmDiscussionModel } from './models/discussion.model';
import { TypeOrmMessageModel } from './models/message.model';
import { typeormRepositoryProviders } from './typeorm-repository.providers';

const repositories = typeormRepositoryProviders();
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
  providers: [...repositories],
  exports: repositories.map((r) => r.provide),
})
export class TypeOrmModule {}
