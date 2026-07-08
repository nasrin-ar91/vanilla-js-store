import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, {
    cascade: true,
  })
  cart: CartItem[];

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  sessions: Session[];
}
