import { Board, Log, Streak, Prisma } from '@prisma/client';
import { LogRepository } from './log.repository';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './log.dto';
import { StreakRepository } from '../streak/streak.repository';
import { BoardService } from '../board/board.service';
import { EventsGateway } from '../../events/events.gateway';

@Injectable()
export class LogService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly boardService: BoardService,
    private readonly streakRepository: StreakRepository,
    private eventsGateway: EventsGateway,
  ) {}

  async createLog(boardId: string, data: CreateLogDto): Promise<Board> {
    const res = await this.logRepository.create(data);
    this.eventsGateway.io.emit('update', { type: 'board', id: boardId });

    return await this.boardService.updateStreak(data.streakId, boardId);
    // Other methods that use the logRepository
  }
  // TODO : complete this
  async getLogs(
    streakId: string,
    limit?: number,
    from?: Date | string,
    to?: Date | string,
  ) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const logs = await this.logRepository.findMany({
      where: {
        streak: { id: streakId },
        ...(fromDate && { created_at: { gte: fromDate } }),
        ...(toDate && {
          created_at: { ...(fromDate ? { gte: fromDate } : {}), lte: toDate },
        }),
      },
      orderBy: { created_at: 'desc' },
      ...(limit && { take: limit }),
    });
    return logs;
  }
}
