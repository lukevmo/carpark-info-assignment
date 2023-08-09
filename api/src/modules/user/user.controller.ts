import { Body, ClassSerializerInterceptor, Controller, Post, Request, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GuardPublic } from '@src/guards/guard.decorator';
import { AddFavoriteCarparkBodyRequestDto, AuthBodyRequestDto } from './user.dto';

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
}
