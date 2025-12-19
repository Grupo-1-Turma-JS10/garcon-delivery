import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export enum OrderStatus {
    PENDING = 'pendente',
    PREPARING = 'em_preparacao',
    SHIPPED = 'enviado',
    DELIVERED = 'entregue',
    CANCELLED = 'cancelado',
}


export class CreateOrderDto {
    @ApiProperty({ example: "2023-10-01T12:00:00Z", description: "Date when the order was placed", required: false })
    @IsOptional()
    @IsDate()
    orderDate?: Date;

    @ApiProperty({ example: 1, description: "Identifier of the user who placed the order" })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ example: "Rua das Flores", description: "Street name of the delivery address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    street: string;

    @ApiProperty({ example: "123", description: "Number of the delivery address" })
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty({ example: "Bairro Jardim", description: "Neighborhood of the delivery address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    neighborhood: string;

    @ApiProperty({ example: "São Paulo", description: "City of the delivery address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    city: string;

    @ApiProperty({ example: "SP", description: "State of the delivery address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    state: string;

    @ApiProperty({ example: "01001-000", description: "Postal code of the delivery address" })
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @ApiProperty({ example: "Apto 101", description: "Additional delivery address information", required: false })
    @IsOptional()
    @IsString()
    complement?: string;

    @ApiProperty({ example: "pendente", description: "Current status of the order", required: false })
    @IsOptional()
    @IsString()
    status?: OrderStatus;
}
