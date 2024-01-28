import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ApiModule } from './api/api.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [UserModule, ApiModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
