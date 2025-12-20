import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, MinLength, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
    @ApiProperty({ example: "Burger", description: "Name of the product", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: "A delicious burger", description: "Description of the product", required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 25.50, description: "Price of the product", required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiProperty({ example: true, description: "Whether the product is available", required: false })
    @IsOptional()
    @IsBoolean()
    available?: boolean;
}
