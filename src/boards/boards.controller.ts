import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AuthorGuard } from 'src/common/guard/author.guard'; // AuthorGuard 추가

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Request() req,
  ): Promise<Board> {
    console.log('User from request:', req.user); // 디버그용 로그
    return this.boardsService.create(createBoardDto, req.user.userId); // userId만 전달
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), AuthorGuard) // AuthorGuard 추가
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto, req.user.userId); // userId 전달
  }

  @UseGuards(AuthGuard('jwt'), AuthorGuard) // AuthorGuard만 적용
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<void> {
    console.log('User from request:', req.user.userId); // 디버그용 로그
    return this.boardsService.remove(id, req.user.userId); // userId 전달
  }
}
