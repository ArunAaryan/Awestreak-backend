import { Injectable } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardRepository {
  constructor(private prisma: PrismaService) {}
  async board(
    boardWhereUniqueInput: Prisma.BoardWhereUniqueInput,
  ): Promise<Board | null> {
    return this.prisma.board.findUnique({
      where: boardWhereUniqueInput,
      include: {
        Streak: {
          include: {
            User: true,
          },
        },
      },
    });
  }

  async boards(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BoardWhereUniqueInput;
    where?: Prisma.BoardWhereInput;
    orderBy?: Prisma.BoardOrderByWithRelationInput;
    joinStreak?: boolean;
  }): Promise<Board[]> {
    const { skip, take, cursor, where, orderBy, joinStreak } = params;
    return this.prisma.board.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Streak: joinStreak,
      },
    });
  }

  async createBoard(data: Prisma.BoardCreateInput): Promise<Board> {
    return this.prisma.board.create({
      data,
    });
  }

  async updateBoard(params: {
    where: Prisma.BoardWhereUniqueInput;
    data: Prisma.BoardUpdateInput;
  }): Promise<Board> {
    const { where, data } = params;
    return this.prisma.board.update({
      data,
      where,
    });
  }

  async deleteBoard(where: Prisma.BoardWhereUniqueInput): Promise<Board> {
    return this.prisma.board.delete({
      where,
    });
  }
}
