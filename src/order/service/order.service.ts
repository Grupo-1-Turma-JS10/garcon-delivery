import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../entities/order.entity";
import { DeleteResult, In, Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { AddressService } from "../../address/service/address.service";
import { UserService } from "../../user/service/user.service";
import { UpdateOrderDto } from "../dto/update-order.dto";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @Inject(AddressService)
        private readonly addressService: AddressService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) { }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: {
                address: true,
                user: true,
                orderItems: {
                    product: true
                }
            }
        });
    }

    async findById(id: number): Promise<Order> {

        let order = await this.orderRepository.findOne({
            where: {
                id
            },
            relations: {
                address: true,
                user: true,
                orderItems: {
                    product: true
                }
            }
        });

        if (!order)
            throw new HttpException('Pedido não encontrado!', HttpStatus.NOT_FOUND);

        return order;
    }

    async findByUserId(userId: number): Promise<Order[]> {

        let orders = await this.orderRepository.find({
            where: {
                user: { id: userId }
            },
            relations: {
                address: true,
                user: true,
                orderItems: {
                    product: true
                }
            }
        });

        if (!orders || orders.length === 0)
            throw new HttpException('Pedidos não encontrados para o usuário informado!', HttpStatus.NOT_FOUND);

        return orders;
    }

    async create(order: CreateOrderDto): Promise<Order> {

        try {
            const address = await this.addressService.findOne(order.addressId);
            const user = await this.userService.findById(order.userId);

            const newOrder = this.orderRepository.create({
                orderDate: order.orderDate || new Date(),
                status: order.status,
                user,
                address
            });

            return await this.orderRepository.save(newOrder);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao criar o pedido: ' + error.message);
        }
    }

    async update(id: number, order: UpdateOrderDto): Promise<Order> {
        try {
            await this.findById(id);

            if (order.addressId) {
                await this.addressService.findOne(order.addressId);
            }

            const result = await this.orderRepository.update(id, order);
            if (result.affected === 0) {
                throw new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND);
            }

            return await this.findById(id);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao atualizar o pedido: ' + error.message);
        }
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.orderRepository.delete(id);

    }

    async updateTotalPrice(orderId: number, totalPrice: number): Promise<void> {
        await this.orderRepository.update(orderId, { totalPrice });
    }
}