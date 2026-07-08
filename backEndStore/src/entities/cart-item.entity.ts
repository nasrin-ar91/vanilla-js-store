import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Sneakers } from './sneakers.entity';

@Entity()
@Unique(['user', 'sneaker'])
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Sneakers, (sneaker) => sneaker.cartItems, {
    onDelete: 'CASCADE',
    eager: true,
  })
  sneaker: Sneakers;
}


