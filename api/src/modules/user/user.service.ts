import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { AddFavoriteCarparkBodyRequestDto, AuthBodyRequestDto } from './user.dto';
import { UserRepository } from './user.repository';
import { httpBadRequest, httpNotFound, httpUnauthorized } from '@src/share/http-exception';
import { ConfigService } from '@nestjs/config';
import { EEnvType } from '@src/constants/env.type';
import { IUserInfo } from './user.interface';
import { TokenService } from '../token/token.service';
import { WishListService } from '../wish-list/wish-list.service';
import { CarparkInfoService } from '../carpark-info/carpark-info.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly carparkInfoService: CarparkInfoService,
    private readonly wishListService: WishListService,
  ) {}

  hashPassword(password: string) {
    const saltRounds = this.configService.get<number>(EEnvType.BCRYPT_SALT_ROUNDS) || 14;
    return hash(password, saltRounds);
  }

  async register(body: AuthBodyRequestDto) {
    const existedUser = await this.userRepository.getRepository().findOne({
      where: {
        username: body.username,
      },
    });
    if (existedUser) httpBadRequest('Username already exist!');

    const hashPassword = await this.hashPassword(body.password);
    const user: IUserInfo = {
      username: body.username,
      password: hashPassword,
    };
    const data = await this.userRepository.saveNewUser(user);
    return {
      id: data.id,
    };
  }

  async login(body: AuthBodyRequestDto) {
    const user = await this.userRepository.getRepository().findOne({
      where: { username: body.username },
    });
    if (!user) httpNotFound('Username not found!');

    if (!(await compare(body.password, user.password))) {
      httpUnauthorized();
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const accessToken = this.tokenService.signJwt(payload);
    return { accessToken };
  }

  async addFavoriteCarpark(userId: number, body: AddFavoriteCarparkBodyRequestDto) {
    const user = await this.userRepository.getRepository().findOne({
      where: {
        id: userId,
      },
    });
    if (!user) httpUnauthorized('User not found!');

    const carparkInfo = await this.carparkInfoService.findOneWithOptions({
      where: {
        carParkNo: body.carparkNoId,
      },
    });
    if (!carparkInfo) httpNotFound('Carpark not found!');

    const data = await this.wishListService.addFavoriteCarparkOfUser(userId, body.carparkNoId);
    return data;
  }
}
