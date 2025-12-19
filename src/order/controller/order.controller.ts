import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { Order } from "../entities/order.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Retrieve an order by its ID' })
    @ApiResponse({ status: 200, description: 'The order has been successfully retrieved.', type: Order })
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.orderService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() order: Order): Promise<Order> {
        return this.orderService.create(order);
    }

    @Put()
    @ApiOperation({ summary: 'Update an existing order' })
    @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: Order })
    @HttpCode(HttpStatus.OK)
    update(@Body() order: Order): Promise<Order> {
        return this.orderService.update(order);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an order by its ID' })
    @ApiResponse({ status: 204, description: 'The order has been successfully deleted.' })
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.delete(id);
    }
}