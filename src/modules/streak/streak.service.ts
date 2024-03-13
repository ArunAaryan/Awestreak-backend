import { Injectable, Logger } from '@nestjs/common';
import { Streak, Prisma, PrismaClient } from '@prisma/client';
import { StreakRepository } from './streak.repository';
import { BoardRepository } from '../board/board.repository';
import { getDaysDifference } from 'src/utils';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class StreakService {
  constructor(
    private repository: StreakRepository,
    private boardRepository: BoardRepository,
    private prisma: PrismaService,
  ) {}

  async updateStreakJob(data: { type: 'MONTHLY' | ' WEEKLY' | 'EVERYDAY' }) {
    const { type } = data;
    switch (type) {
      case 'EVERYDAY':
        const boards = await this.boardRepository.boards({});
        // get streaks and its associated logs with limit 1
        const streaks = await this.repository.streaksWithLogs({
          where: {
            boardId: {
              in: boards.map((board) => board.id),
            },
          },
        });
        // const streaks = await this.repository.streaksWithLogs({});
        await this.prisma.$transaction(async (prisma) => {
          for (let i = 0; i < streaks.length; i++) {
            let streak = streaks[i];
            if (streaks[i].Log.length > 0) {
              const log = streaks[i].Log;
              if (getDaysDifference(log[0].created_at, new Date()) > 1) {
                console.log(
                  'found log with more than 1 days difference',
                  log[0].created_at,
                  new Date(),
                );
                if (streak.freezes > 0) {
                  console.log('freezes are more', streak.freezes);
                  streak.freezes -= 1;
                } else {
                  console.log('freezes', streak.freezes);
                  streak.current_streak = 0;
                }
              }
              // get baords first and their relation streaks and logs
            } // remove else block and add a default log when a user joins a board.
            else {
              if (getDaysDifference(streak.updated_at, new Date()) > 1) {
                console.log(
                  'found streak with more than 1 days difference',
                  getDaysDifference(streak.updated_at, new Date()),
                );
                streak.current_streak = 0;
              }
            }
            const { Log, ...streak_ } = streak;
            const streakRes = await this.prisma.streak.update({
              where: { id: streak.id },
              data: streak_,
            });
            console.log(streakRes, 'streakRes');
          }
        });
    }
    return 'done';
  }
}
