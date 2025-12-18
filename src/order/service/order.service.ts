import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../entities/order.entity";
import { DeleteResult, Repository } from "typeorm";


@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations:{
                address: true,
                user: true
            }
        });
    }

    async findById(id: number): Promise<Order> {

        let order = await this.orderRepository.findOne({
            where: {
                id
            },
            relations:{
                address: true,
                user: true
            }
        });

        if (!order)
            throw new HttpException('Pedido não encontrado!', HttpStatus.NOT_FOUND);

        return order;
    }

    async create(order: Order): Promise<Order> {

        //await this.addressService.findById(order.address.id);

        //await this.userService.findById(order.user.id)

        return await this.orderRepository.save(order);
    }

    async update(order: Order): Promise<Order> {
        
        await this.findById(order.id);

        //await this.addressService.findById(order.address.id);

        //await this.userService.findById(order.user.id)
        
        return await this.orderRepository.save(order);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        await this.findById(id);

        return await this.orderRepository.delete(id);

    }
}