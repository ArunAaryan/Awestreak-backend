import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ApiModule } from './api/api.module';
import { BoardModule } from './modules/board/board.module';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [UserModule, ApiModule, BoardModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
