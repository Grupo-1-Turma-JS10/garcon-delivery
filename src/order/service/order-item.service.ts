import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>) {}
}