import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { Sneakers } from './entities/sneakers.entity';
import { TaskController } from './controllers/sneakers.controller';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { SneakerService } from './services/sneakers.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionExpirationTaskService } from './schedulers/session-expiration.task';
import { CartItem } from './entities/cart-item.entity';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Session, Sneakers, CartItem]),
    ScheduleModule.forRoot(),
  ],
  controllers: [TaskController, AuthController, UserController, CartController],
  providers: [
    AuthService,
    UserService,
    SneakerService,
    CartService,
    SessionExpirationTaskService,
  ],
})
export class AppModule {}
