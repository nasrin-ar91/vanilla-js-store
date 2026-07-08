import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartService } from 'src/services/cart.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { AddCartItemDto } from 'src/dto/add-cart-item.dto';
import { UpdateCartItemDto } from 'src/dto/update-cart-item.dto';

@Controller('cart')
@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: User) {
    return this.cartService.getCart(user);
  }

  @Post()
  addItem(@CurrentUser() user: User, @Body() body: AddCartItemDto) {
    return this.cartService.addItem(user, body);
  }

  @Patch(':id')
  updateItem(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user, id, body);
  }

  @Delete(':id')
  removeItem(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.removeItem(user, id);
  }
}



