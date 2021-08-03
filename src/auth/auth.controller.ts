/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UsersAuthResponse } from 'src/doc/users.response';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

class AuthUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiCreatedResponse({
        type: UsersAuthResponse,
    })
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() user: AuthUserDTO) {
        return this.authService.login(user);
    }
}