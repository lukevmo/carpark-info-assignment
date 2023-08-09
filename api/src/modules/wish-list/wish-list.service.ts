import { Injectable } from '@nestjs/common';
import { WishListRepository } from './wish-list.repository';
import { httpBadRequest, httpNotFound } from '@src/share/http-exception';
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

  getListFavoriteCarpark(userId: number, page: number, limit: number) {
    return this.wishListRepository.getListFavoriteCarpark(userId, page, limit);
  }

  async deleteFavoriteCarpark(userId: number, wishListId: number) {
    const existFavoriteCarpark = await this.wishListRepository.getRepository().findOne({
      where: {
        id: wishListId,
        userId: userId,
      },
    });
    if (!existFavoriteCarpark) httpNotFound('The carpark is not found!');

    return this.wishListRepository.getRepository().remove(existFavoriteCarpark);
  }
}
