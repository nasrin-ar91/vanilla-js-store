import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from 'src/entities/cart-item.entity';
import { Sneakers } from 'src/entities/sneakers.entity';
import { User } from 'src/entities/user.entity';
import { AddCartItemDto } from 'src/dto/add-cart-item.dto';
import { UpdateCartItemDto } from 'src/dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(Sneakers)
    private readonly sneakersRepository: Repository<Sneakers>,
  ) {}

  getCart(user: User) {
    return this.cartRepository.find({
      where: { user: { id: user.id } },
      relations: { sneaker: true },
      order: { id: 'ASC' },
    });
  }

  async addItem(user: User, body: AddCartItemDto) {
    const sneaker = await this.sneakersRepository.findOne({
      where: { id: body.sneakerId },
    });
    if (!sneaker) {
      throw new NotFoundException('Sneaker not found');
    }

    let cartItem = await this.cartRepository.findOne({
      where: {
        user: { id: user.id },
        sneaker: { id: body.sneakerId },
      },
      relations: { sneaker: true },
    });

    if (cartItem) {
      cartItem.quantity += body.quantity ?? 1;
    } else {
      cartItem = this.cartRepository.create({
        user,
        sneaker,
        quantity: body.quantity ?? 1,
      });
    }

    return this.cartRepository.save(cartItem);
  }

  async updateItem(user: User, cartItemId: number, body: UpdateCartItemDto) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, user: { id: user.id } },
      relations: { sneaker: true },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = body.quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeItem(user: User, cartItemId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, user: { id: user.id } },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    await this.cartRepository.remove(cartItem);
  }
}



