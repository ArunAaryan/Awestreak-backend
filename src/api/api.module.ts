import { Module } from '@nestjs/common';
import { BoardModule } from '../modules/board/board.module';
import { LogModule } from '../modules/log/log.module';
import { StreakModule } from '../modules/streak/streak.module';
import { UserModule } from '../modules/user/user.module';
import { ApiController } from './api.controller';
@Module({
  imports: [UserModule, BoardModule, LogModule, StreakModule],
  controllers: [ApiController],
})
export class ApiModule {}
