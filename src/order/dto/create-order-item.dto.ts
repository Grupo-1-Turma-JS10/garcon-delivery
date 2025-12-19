import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderItemDto {
    @ApiProperty({ example: 1, description: "Identifier of the order this item belongs to" })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @ApiProperty({ example: 1, description: "Identifier of the product in the order item" })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({ example: 1, description: "Quantity of the product in the order item" })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 9.99, description: "Unit price of the product in the order item" })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    unitPrice: number;
}
