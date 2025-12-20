import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
    @ApiProperty({ example: 1, description: "Product ID" })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({ example: 2, description: "Quantity" })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: "Please deliver to the back door.", description: "Additional observations for the order", required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    observations?: string;
}

export class CreateOrderDto {
    @ApiProperty({ example: 1, description: "Client user ID" })
    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @ApiProperty({ example: 2, description: "Restaurant user ID" })
    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;

    @ApiProperty({
        example: [
            { productId: 1, quantity: 2, observations: "No onions, please." },
            { productId: 2, quantity: 2, observations: "Extra ice." },
        ],
        description: "Order items",
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}

