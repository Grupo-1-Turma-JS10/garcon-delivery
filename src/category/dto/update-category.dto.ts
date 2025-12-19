import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateCategoryDto {
    @ApiProperty({ example: "Vegan", description: "Name of the category", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: "Category for all vegan products", description: "Description of the category", required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
