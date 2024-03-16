import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Board, Log } from '@prisma/client';
import { Request } from 'express';
import { CreateBoardDto } from 'src/modules/board/board.dto';
import { BoardService } from 'src/modules/board/board.service';
import { CreateLogDto } from 'src/modules/log/log.dto';
import { LogService } from 'src/modules/log/log.service';
import { StreakService } from 'src/modules/streak/streak.service';
import { UserService } from 'src/modules/user/user.service';

@Controller()
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly logService: LogService,
    private readonly streakService: StreakService,
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

  @Post(`boards`)
  async createBoard(@Body() createBoardDto, @Req() req?: Request) {
    const userId = req.headers.authorization;
    return this.boardService.createBoard({
      ...createBoardDto,
      userId,
      frequency: parseInt(createBoardDto.frequency || 0),
    });
  }

  @Get(`boards`)
  getBoards(@Query('joinStreak') joinStreak?: string) {
    const params = { joinStreak: joinStreak === 'true' };
    return this.boardService.getBoards(params);
  }

  @Get(`boards/my`)
  getUserBoards(
    @Query('joinStreak') joinStreak?: string,
    @Req() req?: Request,
  ) {
    const userId = req.headers.authorization;
    const params = { joinStreak: joinStreak === 'true', userId };
    return this.boardService.getBoards(params);
  }

  @Get(`boards/:id`)
  getBoard(@Param('id') id) {
    return this.boardService.getBoard(id);
  }
  @Post(`boards/:id/join`)
  async joinBoard(@Param('id') id, @Req() req?: Request) {
    const userId = req.headers.authorization;
    const params = { userId: userId, boardId: id };
    const streakRes = await this.boardService.joinBoard(params);
    return await this.boardService.getBoard(id);
  }
  @Put(`boards/:id`)
  async updateBoard(
    @Body()
    data: { name: string; description: string; image?: string },
    @Param('id') id,
    @Req() req?: Request,
  ) {
    const userId = req.headers.authorization;
    const { name, description, image } = data;
    return this.boardService.updateBoard({
      id,
      name,
      description,
      image,
      userId,
    });
  }

  @Delete(`boards/:id/join`)
  async leaveBoard(@Param('id') id, @Req() req?: Request) {
    const userId = req.headers.authorization;
    const streakRes = await this.boardService.leaveBoard(userId, id);
    return await this.boardService.getBoard(id);
  }

  @Delete(`boards/:id`)
  async deleteBoard(@Param('id') id, @Req() req?: Request) {
    const userId = req.headers.authorization;
    const deleteBoardRes = await this.boardService.deleteBoard(userId, id);
    return deleteBoardRes;
  }

  @Put(`boards/:id/updateStreak`)
  async udpateStreak(
    @Param('id') id,
    @Body() data: { streakId: string },
    @Req() req?: Request,
  ) {
    const { streakId } = data;
    const userId = req.headers.authorization;
    const updateStreak = await this.boardService.updateStreak(streakId, id);
    return updateStreak;
  }

  @Post(`boards/:id/logs`)
  async createLog(
    @Param('id') boardId,
    @Body() createLogDto: CreateLogDto,
  ): Promise<Board> {
    return this.logService.createLog(boardId, createLogDto);
  }

  @Post(`logs/updateStreak`)
  async updateSteakJob(
    @Body() data: { type: 'MONTHLY' | 'WEEKLY' | 'EVERYDAY' },
  ): Promise<string> {
    return this.streakService.updateStreakJob(data);
  }
}
