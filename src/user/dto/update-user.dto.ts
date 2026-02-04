import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: "John Doe", description: "Name of the user", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: "12345678900", description: "Document number of the user. CPF or CNPJ", required: false })
    @IsOptional()
    @IsString()
    document?: string;

    @ApiProperty({ example: "john.doe@example.com", description: "Email address of the user", required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "password123", description: "Password of the user", required: false })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @ApiProperty({ example: "Rua das Flores, 123, São Paulo, SP", description: "Address of the user", required: false })
    @IsOptional()
    @IsString()
    address?: string;
}