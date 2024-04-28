import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '../modules/prisma/prisma.module';
import { UserRepository } from '../modules/user/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, UserRepository, JwtService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
