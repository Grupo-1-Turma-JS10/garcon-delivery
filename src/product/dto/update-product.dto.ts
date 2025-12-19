import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
    @ApiProperty({ example: "Pizza Margherita", description: "Name of the product", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: 19.99, description: "Price of the product", required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @ApiProperty({ example: "Delicious pizza with tomatoes, mozzarella, and basil", description: "Description of the product", required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 1, description: "Identifier of the category the product belongs to", required: false })
    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
