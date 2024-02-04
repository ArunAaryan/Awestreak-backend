import { Injectable } from '@nestjs/common';
import { Board } from '@prisma/client';
import { BoardRepository } from './board.repository';
@Injectable()
export class BoardService {
  constructor(private repository: BoardRepository) {}
  async createBoard(params: {
    name: Board[`name`];
    description: Board[`description`];
  }) {
    const { name, description } = params;
    const board = await this.repository.createBoard({
      name,
      description,
    });
    return board;
  }

  async getBoards(params?: { joinStreak?: boolean }) {
    const { joinStreak } = params;
    const boards = await this.repository.boards({
      joinStreak,
    });
    return boards;
  }

  async getBoard(id: string) {
    const board = await this.repository.board({ id });
    return board;
  }

  //write board/:id route here
}
