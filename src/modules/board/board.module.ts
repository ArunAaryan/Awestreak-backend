import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakRepository } from '../streak/streak.repository';

@Module({
  imports: [PrismaModule],
  providers: [BoardRepository, BoardService, StreakRepository,],
  exports: [BoardService],
})
export class BoardModule {}
