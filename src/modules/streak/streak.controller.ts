import { Body, Controller, Get, Post } from '@nestjs/common';

import { StreakService } from './streak.service';
import { Streak } from '@prisma/client';

@Controller('streak')
export class StreakController {
  constructor(private streakService: StreakService) {}

  @Post(`logs/updateStreak`)
  async updateSteakJob(): Promise<Streak[]> {
    return (await this.streakService.updateStreakJob()) as Streak[];
  }

  @Get(`logs/resetStreak/weekly`)
  async resetStreakJobWeekly(): Promise<string> {
    return await this.streakService.resetStreakJob('WEEKLY');
  }
  @Get(`logs/resetStreak/monthly`)
  async resetStreakJobMonthly(): Promise<string> {
    return await this.streakService.resetStreakJob('MONTHLY');
  }
}
