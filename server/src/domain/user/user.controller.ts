import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindByUserIdDto } from './dto/find-by-user-id.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get('me')
  getCurrentUser() {
    return this.userService.getCurrentUser();
  }

  @Get(':id')
  findById(@Param() id: FindByUserIdDto) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param() id: FindByUserIdDto, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param() id: FindByUserIdDto) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
