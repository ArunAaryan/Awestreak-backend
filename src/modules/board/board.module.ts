import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BoardRepository, BoardService],
  exports: [BoardService],
})
export class BoardModule {}
