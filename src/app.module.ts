import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ApiModule } from './api/api.module';
import { BoardModule } from './modules/board/board.module';
import { LogModule } from './modules/log/log.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ApiModule,
    BoardModule,
    LogModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
