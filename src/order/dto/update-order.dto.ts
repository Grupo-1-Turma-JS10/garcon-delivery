import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, OrderItem } from '../entities/order.entity';
import { OrderItemDto } from './create-order.dto';

export class UpdateOrderDto {
    @ApiProperty({ example: [{ productId: 1, name: "Burger", price: 25.50, quantity: 2 }], description: "Order items", required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items?: OrderItemDto[];

    @ApiProperty({ example: 119.97, description: "Total price", required: false })
    @IsOptional()
    @IsNumber()
    total?: number;

    @ApiProperty({ example: "CONFIRMED", description: "Order status", required: false, enum: OrderStatus })
    @IsOptional()
    @IsString()
    status?: OrderStatus;
}

