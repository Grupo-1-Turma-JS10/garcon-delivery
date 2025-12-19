import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum OrderStatus {
    PENDING = 'pendente',
    PREPARING = 'em_preparacao',
    SHIPPED = 'enviado',
    DELIVERED = 'entregue',
    CANCELLED = 'cancelado',
}


export class CreateOrderDto {
    @ApiProperty({ example: "2023-10-01T12:00:00Z", description: "Date when the order was placed" })
    @IsNotEmpty()
    @IsDate()
    orderDate: Date;

    @ApiProperty({ example: 1, description: "Identifier of the user who placed the order" })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ example: 1, description: "Identifier of the address for the order" })
    @IsNotEmpty()
    @IsNumber()
    addressId: number;

    @ApiProperty({ example: "pendente", description: "Current status of the order", required: false })
    @IsNotEmpty()
    @IsString()
    status: OrderStatus;
}
