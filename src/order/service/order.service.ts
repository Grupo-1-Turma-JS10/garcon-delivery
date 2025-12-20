import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderStatus } from "../entities/order.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UserService } from "../../user/service/user.service";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { ProductService } from "../../product/service/product.service";

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ) { }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: {
                client: true,
                restaurant: true,
            }
        });
    }

    async findById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: {
                client: true,
                restaurant: true,
            }
        });

        if (!order)
            throw new HttpException('Order not found!', HttpStatus.NOT_FOUND);

        return order;
    }

    async findByClientId(clientId: number): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            where: {
                client: { id: clientId }
            },
            relations: {
                client: true,
                restaurant: true,
            }
        });

        if (!orders || orders.length === 0)
            throw new HttpException('No orders found for this client!', HttpStatus.NOT_FOUND);

        return orders;
    }

    async findByRestaurantId(restaurantId: number): Promise<Order[]> {
        const orders = await this.orderRepository.find({
            where: {
                restaurant: { id: restaurantId }
            },
            relations: {
                client: true,
                restaurant: true,
            }
        });

        if (!orders || orders.length === 0)
            throw new HttpException('No orders found for this restaurant!', HttpStatus.NOT_FOUND);

        return orders;
    }

    async findByStatus(status: string): Promise<Order[]> {
        const orderStatus = status.toUpperCase() as OrderStatus;
        if (!Object.values(OrderStatus).includes(orderStatus)) {
            throw new HttpException('Invalid status!', HttpStatus.BAD_REQUEST);
        }

        const orders = await this.orderRepository.find({
            where: { status: orderStatus },
            relations: {
                client: true,
                restaurant: true,
            }
        });

        if (!orders || orders.length === 0)
            throw new HttpException('No orders found for this status!', HttpStatus.NOT_FOUND);

        return orders;
    }

    async create(dto: CreateOrderDto): Promise<Order> {
        this.logger.log(`Creating order for client ID: ${dto.clientId}`);
        try {
            const client = await this.userService.findById(dto.clientId);
            const restaurant = await this.userService.findById(dto.restaurantId);

            // Validar items e preencher com dados do banco
            const validatedItems: { productId: number; name: string; price: number; quantity: number }[] = [];
            let calculatedTotal = 0;

            for (const item of dto.items) {
                const product = await this.productService.findById(item.productId);
                
                if (!product) {
                    throw new BadRequestException(`Product with ID ${item.productId} not found`);
                }

                if (product.restaurant.id !== dto.restaurantId) {
                    throw new BadRequestException(`Product ${item.productId} does not belong to the restaurant`);
                }

                if (!product.available) {
                    throw new BadRequestException(`Product ${product.name} is not available`);
                }

                // Montar o item com informações do banco
                const validatedItem = {
                    productId: product.id,
                    name: product.name,
                    price: parseFloat(product.price.toString()),
                    quantity: item.quantity,
                };

                validatedItems.push(validatedItem);
                calculatedTotal += validatedItem.price * validatedItem.quantity;
            }

            const order = this.orderRepository.create({
                client,
                restaurant,
                items: validatedItems,
                total: calculatedTotal,
                status: OrderStatus.CREATED,
            });

            return await this.orderRepository.save(order);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Error creating order: ' + error.message);
        }
    }

    async update(id: number, dto: UpdateOrderDto): Promise<Order> {
        try {
            await this.findById(id);

            const result = await this.orderRepository.update(id, {
                items: dto.items,
                total: dto.total,
                status: dto.status,
            });

            if (result.affected === 0) {
                throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
            }

            return await this.findById(id);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating order: ' + error.message);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.orderRepository.delete(id);
    }
}