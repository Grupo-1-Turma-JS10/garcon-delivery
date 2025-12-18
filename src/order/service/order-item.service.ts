import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>) {}

    async findAll(): Promise<OrderItem[]> {
        return await this.orderItemRepository.find({
            relations:{
                order: true,
            }
        });
    }

    async findById(id: number): Promise<OrderItem> {

        let orderItem = await this.orderItemRepository.findOne({
            where: {
                id
            },
            relations:{
                order: true,
            }
        });

        if (!orderItem)
            throw new HttpException('Item de pedido não encontrado!', HttpStatus.NOT_FOUND);

        return orderItem;
    }

    async create(orderItem: OrderItem): Promise<OrderItem> {

        //await this.orderService.findById(orderItem.order.id);

        return await this.orderItemRepository.save(orderItem);
    }

    async update(orderItem: OrderItem): Promise<OrderItem> {
        
        //await this.findById(order.id);

        //await this.orderService.findById(order.orderItem.id);
        
        return await this.orderItemRepository.save(orderItem);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);

        return await this.orderItemRepository.delete(id);
    }
}