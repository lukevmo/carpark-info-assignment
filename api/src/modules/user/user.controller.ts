import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GuardPublic } from '@src/guards/guard.decorator';
import {
  AddFavoriteCarparkBodyRequestDto,
  AuthBodyRequestDto,
  GetListFavoriteCarparkQueryDto,
  ListFavoriteCarparkResponseDto,
} from './user.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @GuardPublic()
  register(@Body() body: AuthBodyRequestDto) {
    return this.userService.register(body);
  }

  @Post('login')
  @GuardPublic()
  login(@Body() body: AuthBodyRequestDto) {
    return this.userService.login(body);
  }

  @Post('favorite-carpark')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  addFavoriteCarpark(@Request() request, @Body() body: AddFavoriteCarparkBodyRequestDto) {
    const userId = request?.user?.id || '';
    return this.userService.addFavoriteCarpark(userId, body);
  }

  @Get('favorite-carpark')
  @ApiBearerAuth()
  @ApiOkResponse({ type: ListFavoriteCarparkResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  getListFavoriteCarpark(@Request() request, @Query() query: GetListFavoriteCarparkQueryDto) {
    const userId = request?.user?.id || '';
    return this.userService.getListFavoriteCarpark(userId, query);
  }

  @Delete('favorite-carpark/:id')
  @ApiBearerAuth()
  @HttpCode(204)
  @UseInterceptors(ClassSerializerInterceptor)
  deleteFavoriteCarpark(@Request() request, @Query('id') id: number) {
    const userId = request?.user?.id || '';
    return this.userService.deleteFavoriteCarpark(userId, id);
  }
}
