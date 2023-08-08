import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/models/user.entity';
import { DataSource, Repository } from 'typeorm';
import { IUserInfo } from './user.interface';

@Injectable()
export class UserRepository {
  private alias: string = 'user';
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getRepository() {
    return this.userRepository;
  }

  saveNewUser(user: IUserInfo) {
    return this.userRepository.save(user);
  }
}
