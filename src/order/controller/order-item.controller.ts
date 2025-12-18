import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { OrderItemService } from "../service/order-item.service";
import { OrderItem } from "../entities/order-item.entity";

@Controller('order-item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) {}

    @Post()
    async create(@Body() orderItem: OrderItem) {
        return await this.orderItemService.create(orderItem);
    }

    @Get()
    async findAll() {
        return await this.orderItemService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.orderItemService.findById(+id);
    }

    @Get('order/:orderId')
    async findByOrder(@Param('orderId') orderId: string) {
        return await this.orderItemService.findByOrder(+orderId);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() orderItem: OrderItem) {
        return await this.orderItemService.update(id, orderItem);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.orderItemService.delete(id);
    }
}
