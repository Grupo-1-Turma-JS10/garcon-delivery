import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { OrderItemService } from "../service/order-item.service";
import { OrderItem } from "../entities/order-item.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('OrderItem')
@Controller('order-item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order item' })
    @ApiResponse({ status: 201, description: 'The order item has been successfully created.', type: OrderItem })
    async create(@Body() orderItem: OrderItem) {
        return await this.orderItemService.create(orderItem);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all order items' })
    @ApiResponse({ status: 200, description: 'List of all order items', type: [OrderItem] })
    async findAll() {
        return await this.orderItemService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve an order item by its ID' })
    @ApiResponse({ status: 200, description: 'The order item has been successfully retrieved.', type: OrderItem })
    async findOne(@Param('id') id: string) {
        return await this.orderItemService.findById(+id);
    }

    @Get('order/:orderId')
    @ApiOperation({ summary: 'Retrieve order items by order ID' })
    @ApiResponse({ status: 200, description: 'List of order items for the specified order', type: [OrderItem] })
    async findByOrder(@Param('orderId') orderId: string) {
        return await this.orderItemService.findByOrder(+orderId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing order item' })
    @ApiResponse({ status: 200, description: 'The order item has been successfully updated.', type: OrderItem })
    async update(@Param('id', ParseIntPipe) id: number, @Body() orderItem: OrderItem) {
        return await this.orderItemService.update(id, orderItem);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an order item by its ID' })
    @ApiResponse({ status: 204, description: 'The order item has been successfully deleted.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.orderItemService.delete(id);
    }
}
