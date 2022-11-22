import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultUserDto } from './dto/result-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: 'The new user has been created',
    type: ResultUserDto,
  })
  @ApiResponse({ status: 400, description: 'Validation errors' })
  @Post()
  @HttpCode(201)
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResultUserDto> {
    const user = await this.userService.createUser(createUserDto);

    return {
      id: user.id,
      email: user.email,
    };
  }
}
