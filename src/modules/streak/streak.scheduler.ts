import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { StreakService } from './streak.service';

@Injectable()
export class StreakScheduler {
  private readonly logger = new Logger(StreakScheduler.name);

  constructor(private readonly streakService: StreakService) {}
  // Every day at midnight
  @Cron('0 0 * * *')
  async handleDailyJob() {
    this.logger.log('Running daily streak update job');
    await this.streakService.updateStreakJob();
  }

  // Every week at Sunday midnight
  @Cron(CronExpression.EVERY_WEEK)
  async handleWeeklyJob() {
    this.logger.log('Running weekly streak reset job');
    await this.streakService.resetStreakJob('WEEKLY');
  }

  // Every month on the 1st at midnight
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleMonthlyJob() {
    this.logger.log('Running monthly streak reset job');
    await this.streakService.resetStreakJob('MONTHLY');
  }
}
