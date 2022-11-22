import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'New user email',
    example: 'test@mail.com',
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty({ message: "Email can't be empty" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'New user password',
    example: 'myverysecurepassword',
    required: true,
    minimum: 5,
    maximum: 20,
  })
  @IsNotEmpty({ message: "Password can't be empty" })
  @IsByteLength(5, 20, {
    message: "Password can't be less than 5 characters and more than 20",
  })
  password: string;
}
