import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Sneakers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'int' })
  pid: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  imageURL: string;

  @Column({ nullable: false })
  colors: string;

  @Column({ nullable: false })
  sizes: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  gender: string;

  @Column({ nullable: false })
  brand: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.sneaker)
  cartItems: CartItem[];
}
