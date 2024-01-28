import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
