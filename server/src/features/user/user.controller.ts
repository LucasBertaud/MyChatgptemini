import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get(':id')
  findById(@Param() id: FindUserByIdDto) {
    return this.userService.findById(id);
  }

  @Get('email/.:email')
  findByEmail(@Param() email: FindUserByEmailDto) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param() id: FindUserByIdDto, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param() id: FindUserByIdDto) {
    return this.userService.remove(id);
  }
}
