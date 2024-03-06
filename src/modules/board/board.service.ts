import { Injectable } from '@nestjs/common';
import { Board, Streak, Prisma } from '@prisma/client';
import { BoardRepository } from './board.repository';
import { StreakRepository } from '../streak/streak.repository';
import { CreateBoardDto } from './board.dto';
@Injectable()
export class BoardService {
  constructor(
    private repository: BoardRepository,
    private streakRepository: StreakRepository,
  ) {}
  async createBoard(createBoardDto: CreateBoardDto) {
    const board = await this.repository.createBoard({
...createBoardDto,

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

  async updateBoard(params: {
    id: Board[`id`];
    name: Board[`name`];
    description: Board[`description`];
    image?: Board[`image`];
    userId: Board[`userId`];
  }) {
    const { name, description, image, userId, id } = params;
    const board = await this.repository.updateBoard({
      data: {
        name,
        description,
        image,
        updated_at: new Date(),
        User: {
          connect: {
            id: userId,
          },
        },
      },
      where: {
        id: id,
      },
    });
    return board;
  }

  async joinBoard(params: {
    userId: Streak['userId'];
    boardId: Streak['boardId'];
    current_streak?: Streak['current_streak'];
  }) {
    // may be should be moved to streak service
    const streak = await this.streakRepository.createStreak(params);
    return streak;
  }
  async leaveBoard(userId: string, boardId: string) {
    const streak = await this.streakRepository.deleteStreak(userId, boardId);
    return streak;
  }

  async deleteBoard(userId: string, boardId: string) {
    const where = { id: boardId };
    // check if current user is the creator; then delete : TODO
    const deleteBoard = await this.repository.deleteBoard(where);
    return deleteBoard;
  }
  async updateStreak(id, boardId: string) {
    const data = await this.streakRepository.streak({ id });

    let data_ = {
      ...data,
      current_streak: data.current_streak + 1,
      updated_at: new Date(),
    };
    const updatedStreak = await this.streakRepository.updateStreak({
      where: { id },
      data: data_,
    });
    const updatedBoard = await this.repository.board({ id: boardId });
    return updatedBoard;
  }
  //write board/:id route here
}
