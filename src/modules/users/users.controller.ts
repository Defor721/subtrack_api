import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Options,
  Res
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async signup(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
  @Options()
  handleOptions(@Res() res: Response) {
    res.setHeader('Access-Control-Allow-Origin', 'https://subtrack-front.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
}