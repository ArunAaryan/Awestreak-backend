import { Body, Controller, Post } from '@nestjs/common';
import { StreakService } from './streak.service';
import { Streak } from '@prisma/client';

@Controller('streak')
export class StreakController {
  constructor(private streakService: StreakService) {}

  @Post(`logs/updateStreak`)
  async updateSteakJob(
    @Body() data: { type: 'MONTHLY' | 'WEEKLY' | 'EVERYDAY' },
  ): Promise<Streak[]> {
    console.log(data);
    return (await this.streakService.updateStreakJob(data)) as Streak[];
  }
}
