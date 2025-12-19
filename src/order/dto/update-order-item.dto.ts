import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemDto {
    @ApiProperty({ example: 1, description: "Identifier of the product in the order item", required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity?: number;

    @ApiProperty({ example: 9.99, description: "Unit price of the product in the order item", required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    unitPrice?: number;
}
