import { Module } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { LogService } from './log.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LogRepository, LogService],
  exports: [LogService],
})
export class LogModule {}
