import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GuardPublic } from '@src/guards/guard.decorator';
import { AuthBodyRequestDto } from './user.dto';

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
}
