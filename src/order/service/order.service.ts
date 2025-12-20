import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order, OrderItem, OrderStatus } from "../entities/order.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateOrderDto, OrderItemDto } from "../dto/create-order.dto";
import { UserService } from "../../user/service/user.service";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { ProductService } from "../../product/service/product.service";
import { User } from "../../user/entities/user.entity";

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
        const order: Order | null = await this.orderRepository.findOne({
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
        const orders: Order[] = await this.orderRepository.find({
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
        const orders: Order[] = await this.orderRepository.find({
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
            const { client, restaurant } = await this.validateUsrerExists(dto.clientId, dto.restaurantId);

            const validatedItems: OrderItem[] = await this.validateProductsInOrder(
                dto.items, dto.restaurantId
            );
            const calculatedTotal: number = this.caulculateTotal(validatedItems);

            const order: Order = this.orderRepository.create({
                client,
                restaurant,
                items: validatedItems,
                total: parseFloat(calculatedTotal.toFixed(2)),
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

            const result: UpdateResult = await this.orderRepository.update(id, {
                items: dto.items,
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

    async validateProductsInOrder(items: OrderItemDto[], restaurantId: number): Promise<OrderItem[]> {
        this.logger.log(`Validating products for restaurant ID: ${restaurantId}`);

        const validatedItems: OrderItem[] = [];

        for (const item of items) {
            const product = await this.productService.findById(item.productId);

            if (!product) {
                this.logger.error(`Product with ID ${item.productId} not found`);
                throw new BadRequestException(`Product with ID ${item.productId} not found`);
            }

            if (product.restaurant.id !== restaurantId) {
                this.logger.error(`Product ${item.productId} does not belong to the restaurant`);
                throw new BadRequestException(`Product ${item.productId} does not belong to the restaurant`);
            }

            if (!product.available) {
                this.logger.error(`Product ${product.name} is not available`);
                throw new BadRequestException(`Product ${product.name} is not available`);
            }

            const validatedItem: OrderItem = {
                productId: product.id,
                name: product.name,
                price: parseFloat(product.price.toString()),
                quantity: item.quantity,
                observations: item.observations,
            };

            validatedItems.push(validatedItem);
        }

        this.logger.log(`All products validated successfully for restaurant ID: ${restaurantId}`);
        return validatedItems;
    };

    async validateUsrerExists(clientId: number, restaurantId: number): Promise<{ client: User; restaurant: User }> {
        this.logger.log(`Validating existence of user ID: ${clientId}`);
        
        const client: User = await this.userService.findById(clientId);
        const restaurant: User = await this.userService.findById(restaurantId);

        if (!client) {
            this.logger.error(`User with ID ${clientId} not found`);
            throw new BadRequestException(`User with ID ${clientId} not found`);
        }

        if (!restaurant) {
            this.logger.error(`User ${clientId} does not belong to the restaurant`);
            throw new BadRequestException(`User ${clientId} does not belong to the restaurant`);
        }

        this.logger.log(`User ID: ${clientId} and Restaurant ID: ${restaurantId} validated successfully`);
        return { client, restaurant };
    }

    caulculateTotal(items: OrderItem[]): number {
        this.logger.log(`Calculating total for order with ${items.length} items`);
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}