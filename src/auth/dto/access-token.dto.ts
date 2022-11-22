import { ApiProperty } from '@nestjs/swagger';
import { jwtConstants } from '../constants';

export class AccessTokenDto {
  @ApiProperty({
    description: `The access token which should be used for authorization. NB! Token valid only during ${jwtConstants.expiration}`,
  })
  accessToken: string;
}
