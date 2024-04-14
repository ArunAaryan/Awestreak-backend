import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/modules/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, UserRepository, JwtService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
