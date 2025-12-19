import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { OrderItem } from "../entities/order-item.entity";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";
import { UpdateOrderItemDto } from "../dto/update-order-item.dto";

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

    async findByOrder(orderId: number): Promise<OrderItem[]> {

        let orderItems = await this.orderItemRepository.find({
            where: {
                order: {
                    id: orderId
                }
            },
            relations:{
                order: true,
            }
        });

        if (!orderItems || orderItems.length === 0)
            throw new HttpException('Itens de pedido não encontrados para o pedido informado!', HttpStatus.NOT_FOUND);

        return orderItems;
    }

    async create(orderItem: CreateOrderItemDto): Promise<OrderItem> {

        //await this.orderService.findById(orderItem.order.id);

        return await this.orderItemRepository.save(orderItem);
    }

    async update(id: number, orderItem: UpdateOrderItemDto): Promise<OrderItem> {
        
        const  existingOrderItem = await this.findById(id);

        //await this.orderService.findById(order.orderItem.id);
        
        return await this.orderItemRepository.save(existingOrderItem);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);

        return await this.orderItemRepository.delete(id);
    }
}
