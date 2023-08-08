import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WishList } from './wish-list.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('increment', {
    name: 'Id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'Username',
    type: 'varchar',
    length: '255',
  })
  username: string;

  @Column({
    name: 'Password',
    type: 'varchar',
    length: '255',
  })
  password: string;

  @CreateDateColumn({
    name: 'Created_at',
  })
  createdAt: Date;

  @OneToMany<WishList>(() => WishList, wishList => wishList.user)
  wishLists: WishList[];
}
