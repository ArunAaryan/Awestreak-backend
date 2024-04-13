import { Board, Log, Streak, Prisma } from '@prisma/client';
import { LogRepository } from './log.repository';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './log.dto';
import { StreakRepository } from '../streak/streak.repository';
import { BoardService } from '../board/board.service';

@Injectable()
export class LogService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly boardService: BoardService,
    private readonly streakRepository: StreakRepository,
  ) {}

  async createLog(boardId: string, data: CreateLogDto): Promise<Board> {
    const res = await this.logRepository.create(data);

    return await this.boardService.updateStreak(data.streakId, boardId);
    // Other methods that use the logRepository
  }
  // TODO : complete this
  async getLogs(streakId: string) {
    const logs = await this.logRepository.findMany({
      where: {
        streak: {
          id: streakId,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return logs;
  }
}
