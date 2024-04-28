import { Body, Controller, Post } from '@nestjs/common';
import { StreakService } from './streak.service';

@Controller('streak')
export class StreakController {
  constructor(private streakService: StreakService) {}

  @Post(`logs/updateStreak`)
  async updateSteakJob(
    @Body() data: { type: 'MONTHLY' | 'WEEKLY' | 'EVERYDAY' },
  ): Promise<string> {
    console.log(data);
    return this.streakService.updateStreakJob(data);
  }
}
