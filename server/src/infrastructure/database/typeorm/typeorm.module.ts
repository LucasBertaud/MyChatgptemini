import { Global, Module } from '@nestjs/common';
import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserRepository } from './repositories/user.repository';
import { TypeOrmUserModel } from './models/user.model';
import { USER_REPOSITORY } from 'src/features/user/repositories/user.repository';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrm.forRoot(typeormConfig()),
    TypeOrm.forFeature([TypeOrmUserModel]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class TypeOrmModule {}
