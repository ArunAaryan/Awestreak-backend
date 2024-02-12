import { Injectable } from '@nestjs/common';
import { Board, Streak, Prisma } from '@prisma/client';
import { BoardRepository } from './board.repository';
import { StreakRepository } from '../streak/streak.repository';
@Injectable()
export class BoardService {
  constructor(
    private repository: BoardRepository,
    private streakRepository: StreakRepository,
  ) {}
  async createBoard(params: {
    name: Board[`name`];
    description: Board[`description`];
    image?: Board[`image`];
  }) {
    const { name, description, image } = params;
    const board = await this.repository.createBoard({
      name,
      description,
      image,
    });
    return board;
  }

  async getBoards(params?: { joinStreak?: boolean; userId?: string }) {
    const { joinStreak, userId } = params;
    let where: Prisma.BoardWhereInput;
    if (userId) {
      where = {
        Streak: {
          some: {
            userId: {
              equals: userId,
            },
          },
        },
      };
    }

    const boards = await this.repository.boards({
      joinStreak,
      userId,
      where,
    });
    return boards;
  }

  async getBoard(id: string) {
    const board = await this.repository.board({ id });
    return board;
  }

  async joinBoard(params: {
    userId: Streak['userId'];
    boardId: Streak['boardId'];
    current_streak?: Streak['current_streak'];
  }) {
    // may be should be moved to streak service
    const streak = await this.streakRepository.createStreak(params);
    console.log(streak);
    return streak;
  }

  //write board/:id route here
}
