import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsersCreatedResponse } from '../doc/users.response';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    type: UsersCreatedResponse,
  })
  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const { _id, nickname, mail } = await this.usersService.create(
      createUserDto,
    );

    return { _id, nickname, mail };
  }

  @ApiCreatedResponse({
    type: UsersCreatedResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    const { _id, nickname, mail } = await this.usersService.update(
      id,
      updateUserDto,
    );

    return { _id, nickname, mail };
  }
}
