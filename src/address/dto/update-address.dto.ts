import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateAddressDto {
    @ApiProperty({ example: "123 Main St", description: "Street name of the address", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    street?: string;

    @ApiProperty({ example: "Apt 4B", description: "Number of the address", required: false })
    @IsOptional()
    @IsString()
    number?: string;

    @ApiProperty({ example: "New York", description: "City of the address", required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    city?: string;

    @ApiProperty({ example: "NY", description: "State of the address", required: false })
    @IsOptional()
    @IsString()
    @MinLength(2)
    state?: string;

    @ApiProperty({ example: "10001", description: "ZIP code of the address", required: false })
    @IsOptional()
    @IsString()
    zipCode?: string;

    @ApiProperty({ example: "Near Central Park", description: "Complement of the address", required: false })
    @IsOptional()
    @IsString()
    complement?: string;
}
