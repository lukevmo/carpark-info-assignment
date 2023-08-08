import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { CarparkInfo } from './carpark-info.entity';

@Entity({ name: 'wish-list' })
export class WishList {
  @PrimaryGeneratedColumn('increment', {
    name: 'Id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'User_id',
    type: 'integer',
  })
  userId: number;

  @Column({
    name: 'Car_park_no_id',
    type: 'varchar',
    length: '255',
  })
  carParkNoId: string;

  @Column({
    name: 'Status',
    type: 'varchar',
    default: 'ACTIVE',
  })
  status: string;

  @CreateDateColumn({
    name: 'Created_at',
  })
  createdAt: Date;

  @ManyToOne<User>(() => User, user => user.wishLists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'User_id' })
  user: User;

  @ManyToOne<CarparkInfo>(() => CarparkInfo, carparkInfo => carparkInfo.wishLists, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'Car_park_no_id' })
  carparkInfo: CarparkInfo;
}
