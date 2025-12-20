import { IsString, IsNumber, IsOptional, Min, MinLength, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({ example: 1, description: "Restaurant ID" })
    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;

    @ApiProperty({ example: "Burger", description: "Name of the product" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ required: false, example: "A delicious burger", description: "Description of the product" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 25.50, description: "Price of the product" })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ example: true, description: "Whether the product is available" })
    @IsOptional()
    @IsBoolean()
    available?: boolean = true;
}
