import { Exclude } from 'class-transformer';
import { Session } from 'src/entities/session.entity';
import { CartItem } from 'src/entities/cart-item.entity';

export class UserResDto {
  id: number;
  username: string;
  cart: CartItem[];
  sessions: Session[];
  @Exclude()
  password: string;
  constructor(partial: Partial<UserResDto>) {
    Object.assign(this, partial);
  }
}
