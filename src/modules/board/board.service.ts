import { Injectable } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';
import { BoardRepository } from './board.repository';
@Injectable()
export class BoardService {
  constructor(private repository: BoardRepository) {}
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

  //write board/:id route here
}
