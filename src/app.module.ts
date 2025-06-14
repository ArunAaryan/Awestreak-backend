import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ApiModule } from './api/api.module';
import { BoardModule } from './modules/board/board.module';
import { LogModule } from './modules/log/log.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UserRepository } from './modules/user/user.repository';
import { PrismaService } from './modules/prisma/prisma.service';
import { EventsGateway } from './events/events.gateway';
import { StreakController } from './modules/streak/streak.controller';
import { StreakModule } from './modules/streak/streak.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ApiModule,
    BoardModule,
    LogModule,
    AuthModule,
    ConfigModule.forRoot(),
    StreakModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, AuthController, StreakController],
  providers: [AppService, GoogleStrategy, JwtStrategy, EventsGateway],
})
export class AppModule {}
