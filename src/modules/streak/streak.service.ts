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

  async weekOrMonthUpdate(type: 'WEEKLY' | 'MONTHLY') {
    const boardsWithStreak = await this.boardRepository.boards({
      where: {
        period: {
          equals: type,
        },
      },
      joinStreak: true,
    });
    console.log('boardsWithStreak', boardsWithStreak.length);
    for (let i = 0; i < boardsWithStreak.length; i++) {
      await this.prisma.$transaction(async (prisma) => {
        const { Streak, frequency } = boardsWithStreak[i];
        // first streak , may be change streak to be one to one
        console.log('Streak', Streak?.length, frequency);
        if (Streak?.length > 0) {
          Streak.map(async (streak) => {
            streak.freezes = type === 'WEEKLY' ? 7 - frequency : 30 - frequency;
            // change freeze logic for each month and also week
            const streakRes = await this.prisma.streak.update({
              where: { id: streak.id },
              data: streak,
            });
            console.log(streakRes);
          });
        }
      });
    }
  }
  async updateStreakJob(data: { type: 'MONTHLY' | 'WEEKLY' | 'EVERYDAY' }) {
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
        // const streaks = await this.repository.streakaWithLogs({});
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
        break;
      case 'WEEKLY':
        this.weekOrMonthUpdate('WEEKLY');
        break;
      case 'MONTHLY':
        this.weekOrMonthUpdate('MONTHLY');
        break;
    } //switch

    return 'Done';
  }
}
