import { Injectable } from '@nestjs/common';
import { WishListRepository } from './wish-list.repository';
import { httpBadRequest } from '@src/share/http-exception';
import { IWishListData } from './wish-list.interface';

@Injectable()
export class WishListService {
  constructor(private readonly wishListRepository: WishListRepository) {}

  async addFavoriteCarparkOfUser(userId: number, carparkNoId: string) {
    const existFavoriteCarpark = await this.wishListRepository.getRepository().findOne({
      where: {
        userId: userId,
        carParkNoId: carparkNoId,
      },
    });
    if (existFavoriteCarpark) httpBadRequest('The carpark already in favorite list!');

    const data: IWishListData = {
      userId: userId,
      carParkNoId: carparkNoId,
    };
    const newFavoriteCarpark = await this.wishListRepository.getRepository().save(data);
    return newFavoriteCarpark;
  }
}
