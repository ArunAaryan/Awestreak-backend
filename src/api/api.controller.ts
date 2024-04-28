import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Board } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BoardService } from '../modules/board/board.service';
import { CreateLogDto } from '../modules/log/log.dto';
import { LogService } from '../modules/log/log.service';
import { StreakService } from '../modules/streak/streak.service';
import { UserService } from '../modules/user/user.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly logService: LogService,
    private readonly streakService: StreakService,
  ) {}

  @Post(`user`)
  async createUser(@Body() data: { name: string; email: string }) {
    const { name, email } = data;
    return this.userService.createUser({
      name,
      email,
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
    const user = req.user as any;
    const params = { joinStreak: joinStreak === 'true', userId: user.id };
    return this.boardService.getBoards(params);
  }

  @Get(`boards/:id`)
  getBoard(@Param('id') id) {
    return this.boardService.getBoard(id);
  }
  @Post(`boards/:id/join`)
  async joinBoard(@Param('id') id, @Req() req?: Request) {
    const user = req.user as any;
    console.log(user, 'user');
    const params = { userId: user.id, boardId: id };
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
    // const userId = req.headers.authorization;
    const user = req.user as any;
    const { name, description, image } = data;
    const res = await this.boardService.getBoard(id);
    if (!res.userId === user.id) {
      return UnauthorizedException;
    }
    return this.boardService.updateBoard({
      id,
      name,
      description,
      image,
      userId: user.id,
    });
  }

  @Delete(`boards/:id/join`)
  async leaveBoard(@Param('id') id, @Req() req?: Request) {
    const user = req.user as any;
    const streakRes = await this.boardService.leaveBoard(user.id, id);
    return await this.boardService.getBoard(id);
  }

  @Delete(`boards/:id`)
  async deleteBoard(@Param('id') id, @Req() req?: Request) {
    const user = req.user as any;
    const res = await this.boardService.getBoard(id);
    if (!res.userId === user.id) {
      return UnauthorizedException;
    }
    const deleteBoardRes = await this.boardService.deleteBoard(user.id, id);
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
  @Get(`logs/:streakId`)
  async getLogs(@Param('streakId') streakId) {
    return this.logService.getLogs(streakId);
  }
}
