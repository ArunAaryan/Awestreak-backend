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
    let boards = await this.repository.boards({
      joinStreak,
    });

    return boards;
  }
}
