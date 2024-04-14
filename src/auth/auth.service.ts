import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async signIn(user) {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }
      const userExists = await this.findUserByEmail(user.email);

      if (!userExists) {
        const newUser = {
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          image: user.picture,
        };
        return this.registerUser(newUser);
      }

      return this.generateJwt({
        id: userExists.id,
        email: userExists.email,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.userRepository.createUser(user);
      return this.generateJwt({
        userId: newUser.id,
        email: newUser.email,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.userByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }
}
