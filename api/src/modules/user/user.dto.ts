import { ApiProperty } from '@nestjs/swagger';
import { toTrimString } from '@src/share/transform';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class AuthBodyRequestDto {
  @ApiProperty()
  @Transform(toTrimString)
  @NotContains(' ')
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @Transform(toTrimString)
  @IsString()
  @IsNotEmpty()
  password: string;
}
