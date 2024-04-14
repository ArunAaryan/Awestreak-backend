import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleOAuthGuard } from './auth/guards/google.oauth.guard';
@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.appService.googleLogin(req);
  }
  // @Get('users')
  // async getUsers(): Promise<UserModel[]> {
  //   return this.userService.users({});
  // }
  // @Post('user')
  // async signupUser(
  //   @Body() userData: Prisma.UserCreateInput,
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }
}
