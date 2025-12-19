import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
    @ApiProperty({ example: "2023-10-01T12:00:00Z", description: "Date when the order was placed", required: false })
    @IsOptional()
    @IsDate()
    orderDate?: Date;

    @ApiProperty({ example: "pendente", description: "Current status of the order", required: false })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ example: 1, description: "Identifier of the address for the order", required: false })
    @IsOptional()
    @IsNumber()
    addressId?: number;
}
