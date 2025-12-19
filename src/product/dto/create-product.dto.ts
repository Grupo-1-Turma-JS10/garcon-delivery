import { IsString, IsNumber, IsOptional, Min, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: "Pizza Margherita", description: "Name of the product" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 19.99, description: "Price of the product" })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ required: false, example: "Delicious pizza with tomatoes, mozzarella, and basil", description: "Description of the product" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 1, description: "Identifier of the category the product belongs to" })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}
