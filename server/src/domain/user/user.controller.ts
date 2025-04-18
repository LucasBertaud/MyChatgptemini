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
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { FindByUuidDto } from '../../shared/dto/find-by-uuid.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get(':id')
  findById(@Param() id: FindByUuidDto) {
    return this.userService.findById(id);
  }

  @Get('email/.:email')
  findByEmail(@Param() email: FindUserByEmailDto) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param() id: FindByUuidDto, @Body() user: UpdateUserDto) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param() id: FindByUuidDto) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
