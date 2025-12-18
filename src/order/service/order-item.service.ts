import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";

@Injectable()
export class OrderItemService {
    constructor(private readonly orderItemRepository: Repository<OrderItem>) {}
}