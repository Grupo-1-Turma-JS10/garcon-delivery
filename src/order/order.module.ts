import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderItemController } from "./controller/order-item.controller";
import { OrderService } from "./service/order.service";
import { OrderItemService } from "./service/order-item.service";
import { OrderController } from "./controller/order.controller";
import { OrderItem } from "./entities/order-item.entity";
import { AddressModule } from "../address/address.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), AddressModule, UserModule],
  controllers: [OrderItemController, OrderController],
  providers: [OrderService, OrderItemService],
  exports: [OrderService, OrderItemService],
})
export class OrderModule {}