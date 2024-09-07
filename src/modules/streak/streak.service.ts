import { Injectable, Logger } from '@nestjs/common';
import { Streak, Prisma, PrismaClient } from '@prisma/client';
import { StreakRepository } from './streak.repository';
import { BoardRepository } from '../board/board.repository';
import { PrismaService } from '../prisma/prisma.service';
import { getDaysDifference } from '../../utils';

@Injectable()
export class StreakService {
  constructor(
    private repository: StreakRepository,
    private boardRepository: BoardRepository,
    private prisma: PrismaService,
  ) {}

  // reset the streak every week or month
  async resetStreakJob() {
    const boardsWithStreak = await this.boardRepository.boards({
      where: {
        period: {
          in: ['MONTHLY', 'WEEKLY'],
        },
      },
      joinStreak: true,
    });
    for (let i = 0; i < boardsWithStreak.length; i++) {
      await this.prisma.$transaction(async (prisma) => {
        const { Streak, frequency, period } = boardsWithStreak[i];
        // first streak , may be change streak to be one to one
        console.log('Streak', Streak?.length, frequency);
        if (Streak?.length > 0) {
          Streak.map(async (streak) => {
            streak.freezes =
              period === 'WEEKLY' ? 7 - frequency : 30 - frequency;
            // change freeze logic for each month and also week
            const streakRes = await this.prisma.streak.update({
              where: { id: streak.id },
              data: streak,
            });
          });
        }
      });
    }
    return 'ok';
  }

  //  check everyday and decrease the streak;
  async updateStreakJob() {
    const boards = await this.boardRepository.boards({});
    // get streaks and its associated logs with limit 1
    const streaks = await this.repository.streaksWithLogs({
      where: {
        boardId: {
          in: boards.map((board) => board.id),
        },
      },
    });
    let updatedStreakRecords = streaks.map((streak) => streak);
    let result = [];
    for (let i = 0; i < updatedStreakRecords.length; i++) {
      let streak = updatedStreakRecords[i];
      let modified = false;
      if (streak.Log.length > 0) {
        const log = streak.Log;
        // check if the streak is made less than today
        if (
          log[0].created_at.getDate() < new Date().getDate() &&
          log[0].created_at.getMonth() === new Date().getMonth() &&
          log[0].created_at.getFullYear() === new Date().getFullYear()
        ) {
          console.log(
            'found log with more than 1 days difference',
            log[0].created_at,
            new Date(),
          );
          modified = true;
          if (streak.freezes > 0) {
            console.log('freezes are more', streak.freezes);
            streak.freezes -= 1;
          } else {
            console.log('freezes', streak.freezes);
            streak.current_streak = 0;
          }
        }
      }
      delete streak.Log;
      if (modified) {
        let res = await this.repository.updateStreak({
          data: {
            current_streak: streak.current_streak,
            freezes: streak.freezes,
            // updated_at: new Date(),
          },
          where: { id: streak.id },
        });
        result.push(res);
        modified = false;
      }
    }
    return result;
  }
}
