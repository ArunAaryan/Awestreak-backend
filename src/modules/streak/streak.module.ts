import { Module } from '@nestjs/common';
import { StreakRepository } from './streak.repository';
import { StreakService } from './streak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [PrismaModule, BoardModule],
  providers: [StreakRepository, StreakService],
  exports: [StreakService, StreakRepository],
})
export class StreakModule {}
