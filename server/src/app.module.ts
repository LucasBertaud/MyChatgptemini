import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
