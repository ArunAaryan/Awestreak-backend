import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakRepository } from '../streak/streak.repository';
import { EventsGateway } from '../../events/events.gateway';

@Module({
  imports: [PrismaModule, EventsGateway],
  providers: [BoardRepository, BoardService, StreakRepository, EventsGateway],
  exports: [BoardService, BoardRepository],
})
export class BoardModule {}
