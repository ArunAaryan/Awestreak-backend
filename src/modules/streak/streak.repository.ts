import { Injectable } from '@nestjs/common';
import { Streak, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StreakRepository {
  constructor(private prisma: PrismaService) {}

  async streak(
    streakWhereUniqueInput: Prisma.StreakWhereUniqueInput,
  ): Promise<Streak | null> {
    return this.prisma.streak.findUnique({
      where: streakWhereUniqueInput,
    });
  }

  async streaks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StreakWhereUniqueInput;
    where?: Prisma.StreakWhereInput;
    orderBy?: Prisma.StreakOrderByWithRelationInput;
  }): Promise<Streak[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.streak.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createStreak(data: Prisma.StreakCreateInput): Promise<Streak> {
    return this.prisma.streak.create({
      data: {
        ...data,
      },
    });
  }

  async updateStreak(params: {
    where: Prisma.StreakWhereUniqueInput;
    data: Prisma.StreakUpdateInput;
  }): Promise<Streak> {
    const { where, data } = params;
    return this.prisma.streak.update({
      data,
      where,
    });
  }

  async deleteStreak(userId: string, boardId: string): Promise<number> {
    const res = await this.prisma.streak.deleteMany({
      where: {
        userId: userId,
        boardId: boardId,
      },
    });
    return res.count;
  }
}
