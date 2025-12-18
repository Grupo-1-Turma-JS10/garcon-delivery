import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { OrderService } from "../service/order.service";
import { Order } from "../entities/order.entity";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() order: Order): Promise<Order> {
    return this.orderService.create(order);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() order: Order): Promise<Order> {
    return this.orderService.update(order);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.orderService.delete(id);
  }
}