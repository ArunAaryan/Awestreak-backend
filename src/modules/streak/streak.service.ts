import { Injectable } from '@nestjs/common';
import { Streak, Prisma } from '@prisma/client';
import { StreakRepository } from './streak.repository';
@Injectable()
export class StreakService {
  constructor(private repository: StreakRepository) {}
}
