import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MinLength, IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ example: "123 Main St", description: "Street name of the address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    street: string;

    @ApiProperty({ example: "Apt 4B", description: "Number of the address" })
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty({ example: "New York", description: "City of the address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    city: string;

    @ApiProperty({ example: "NY", description: "State of the address" })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    state: string;

    @ApiProperty({ example: "10001", description: "ZIP code of the address" })
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @ApiProperty({ example: "Near Central Park", description: "Complement of the address" })
    @IsOptional()
    @IsString()
    complement?: string;

    @ApiProperty({ example: 1, description: "Identifier of the user associated with the address" })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
