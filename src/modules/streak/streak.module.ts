import { Module } from '@nestjs/common';
import { StreakRepository } from './streak.repository';
import { StreakService } from './streak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardModule } from '../board/board.module';
import { StreakController } from './streak.controller';

@Module({
  imports: [PrismaModule, BoardModule],
  providers: [StreakRepository, StreakService, StreakController],
  exports: [StreakService, StreakRepository, StreakController],
})
export class StreakModule {}
