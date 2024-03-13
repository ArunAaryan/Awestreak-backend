import { Module } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { LogService } from './log.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardModule } from '../board/board.module';
import { StreakModule } from '../streak/streak.module';

@Module({
  imports: [PrismaModule, BoardModule, StreakModule],
  providers: [LogRepository, LogService],
  exports: [LogService],
})
export class LogModule {}
