import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ApiModule } from './api/api.module';
import { BoardModule } from './modules/board/board.module';
import { LogModule } from './modules/log/log.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { UserRepository } from './modules/user/user.repository';
import { PrismaService } from './modules/prisma/prisma.service';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    UserModule,
    ApiModule,
    BoardModule,
    LogModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, GoogleStrategy, JwtStrategy, EventsGateway],
})
export class AppModule {}
