import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { ApiController } from './api.controller';
import { BoardModule } from 'src/modules/board/board.module';

@Module({
  imports: [UserModule, BoardModule],
  controllers: [ApiController],
})
export class ApiModule {}
