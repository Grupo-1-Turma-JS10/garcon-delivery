import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderItemController } from "./controller/order-item.controller";
import { OrderService } from "./service/order.service";
import { OrderController } from "./controller/order.controller";
import { OrderItem } from "./entities/order-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderItemController, OrderController],
  providers: [OrderItemController, OrderService],
})
export class CategoryModule {}