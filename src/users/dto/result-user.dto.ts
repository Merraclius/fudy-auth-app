import { ApiProperty } from '@nestjs/swagger';

export class ResultUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}
