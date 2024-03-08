import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { ApiController } from './api.controller';
import { BoardModule } from 'src/modules/board/board.module';
import { LogModule } from 'src/modules/log/log.module';

@Module({
  imports: [UserModule, BoardModule, LogModule],
  controllers: [ApiController],
})
export class ApiModule {}
