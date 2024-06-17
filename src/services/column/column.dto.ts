import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
