import { ApiProperty } from '@nestjs/swagger';
import { WishList } from '@src/models/wish-list.entity';
import { toNumber, toTrimString } from '@src/share/transform';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, NotContains } from 'class-validator';

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

@Exclude()
export class AddFavoriteCarparkBodyRequestDto {
  @ApiProperty()
  @Expose()
  @Transform(toTrimString)
  @IsString()
  @IsNotEmpty()
  carparkNoId: string;
}

export class GetListFavoriteCarparkQueryDto {
  @ApiProperty({ required: false })
  @Transform(({ key, value }) => toNumber(key, value))
  @Min(1)
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false })
  @Transform(({ key, value }) => toNumber(key, value))
  @Max(100)
  @Min(1)
  @IsNumber()
  @IsOptional()
  limit: number;
}

@Exclude()
export class WishListDataDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty()
  @Expose()
  carParkNoId: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  constructor(partial: Partial<WishList>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class ListFavoriteCarparkResponseDto {
  @ApiProperty({ type: [WishListDataDto] })
  @Expose()
  @Type(() => WishListDataDto)
  data: WishListDataDto[];

  @ApiProperty()
  @Expose()
  total: number;

  constructor(data: WishListDataDto[], total: number) {
    this.data = data;
    this.total = total;
  }
}
