import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ResultUserDto } from '../users/dto/result-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiBody({
    type: LoginUserDto,
    description: 'Login user',
  })
  @ApiResponse({
    status: 200,
    description: 'Login was successful',
    type: AccessTokenDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<AccessTokenDto> {
    return this.authService.login(req.body);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Authorized user info',
    type: ResultUserDto,
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser(@Request() req): Promise<ResultUserDto> {
    const user = await this.userService.findById(req.user.id);

    return {
      id: user.id,
      email: user.email,
    };
  }
}
