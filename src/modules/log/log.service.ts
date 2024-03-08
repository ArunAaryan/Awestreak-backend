import { Log } from '@prisma/client';
import { LogRepository } from './log.repository';
import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './log.dto';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  async createLog(data: CreateLogDto): Promise<Log> {
    return await this.logRepository.create(data);
  }

  // Other methods that use the logRepository
}
