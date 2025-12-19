import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: "Health food", description: "Name of the category" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: "Category for all health food products", description: "Description of the category", required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
