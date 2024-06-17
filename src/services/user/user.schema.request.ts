import { ApiProperty } from '@nestjs/swagger';

export class RegisterUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
