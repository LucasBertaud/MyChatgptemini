import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule.register(process.env)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
