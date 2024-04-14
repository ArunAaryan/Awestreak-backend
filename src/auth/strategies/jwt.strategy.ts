import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/user.repository';

export type JwtPayload = {
  id: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    // @Inject(config.KEY) private configService: ConfigType<typeof config>,
    // @InjectRepository(User) private userRepository: Repository<User>,
    private userRepository: UserRepository,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      // req.userId = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.user({ id: payload.id });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
