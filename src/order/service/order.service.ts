import { Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: Repository<Order>) {}re
}