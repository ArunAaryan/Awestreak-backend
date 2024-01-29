import {
  Body,
  Controller,
  Get,
  ParseBoolPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BoardService } from 'src/modules/board/board.service';
import { UserService } from 'src/modules/user/user.service';

@Controller()
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
  ) {}

  @Post(`user`)
  async createUser(@Body() data: { name: string }) {
    const { name } = data;
    return this.userService.createUser({
      name,
    });
  }

  @Get(`users`)
  getUsers() {
    return this.userService.getUsers();
  }

  @Post(`board`)
  async createBoard(@Body() data: { name: string; description: string }) {
    const { name, description } = data;
    console.log('here from api controller');
    return this.boardService.createBoard({
      name,
      description,
    });
  }

  @Get(`boards`)
  getBoards(@Query('joinStreak') joinStreak?: string) {
    const params = { joinStreak: joinStreak === 'true' };
    return this.boardService.getBoards(params);
  }
}
