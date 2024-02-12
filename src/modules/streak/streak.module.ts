import { Module } from '@nestjs/common';
import { StreakRepository } from './streak.repository';
import { StreakService } from './streak.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StreakRepository, StreakService],
  exports: [StreakService],
})
export class StreakModule {}
