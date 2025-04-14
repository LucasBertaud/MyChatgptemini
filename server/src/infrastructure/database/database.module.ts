import { Module } from '@nestjs/common';
import { ConditionalModule } from '@nestjs/config';
import { TypeOrmModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    ConditionalModule.registerWhen(
      TypeOrmModule,
      (env: NodeJS.ProcessEnv) => env.ORM_PROVIDER === 'typeorm',
    ),
  ],
  exports: [],
})
export class DatabaseModule {}
