import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { Order } from "../entities/order.entity";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth-guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,) { }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() order: CreateOrderDto): Promise<Order> {
        return this.orderService.create(order);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('/user/:userId')
    @ApiOperation({ summary: 'Retrieve orders by client ID' })
    @ApiResponse({ status: 200, description: 'List of orders for the specified client', type: [Order] })
    @HttpCode(HttpStatus.OK)
    findByClientId(@Param('userId', ParseIntPipe) clientId: number): Promise<Order[]> {
        return this.orderService.findByClientId(clientId);
    }

    @Get('/restaurant/:restaurantId')
    @ApiOperation({ summary: 'Retrieve orders by restaurant ID' })
    @ApiResponse({ status: 200, description: 'List of orders for the specified restaurant', type: [Order] })
    @HttpCode(HttpStatus.OK)
    findByRestaurantId(@Param('restaurantId', ParseIntPipe) restaurantId: number): Promise<Order[]> {
        return this.orderService.findByRestaurantId(restaurantId);
    }

    @Get('/status/:status')
    @ApiOperation({ summary: 'Retrieve orders by status' })
    @ApiResponse({ status: 200, description: 'List of orders with the specified status', type: [Order] })
    @HttpCode(HttpStatus.OK)
    findByStatus(@Param('status') status: string): Promise<Order[]> {
        return this.orderService.findByStatus(status);
    }
    
    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve an order by its ID' })
    @ApiResponse({ status: 200, description: 'The order with the specified ID', type: Order })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.orderService.findById(id);
    }


    @Put('/:id')
    @ApiOperation({ summary: 'Update an existing order' })
    @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: Order })
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() order: UpdateOrderDto): Promise<Order> {
        return this.orderService.update(id, order);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an order by its ID' })
    @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.delete(id);
    }
}