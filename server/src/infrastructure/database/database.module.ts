import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from './typeorm/typeorm.module';

@Module({})
export class DatabaseModule {
  static register(env: NodeJS.ProcessEnv): DynamicModule {
    const imports = [];
    const exports = [];

    if (env.ORM_PROVIDER === 'typeorm') {
      imports.push(TypeOrmModule);
      exports.push(TypeOrmModule);
    }

    return {
      module: DatabaseModule,
      imports,
      exports,
    };
  }
}
