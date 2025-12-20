import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: "john.doe@example.com", description: "Email address of the user" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "strongPassword123!", description: "Password of the user" })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: "CLIENT", description: "Role of the user", enum: UserRole })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ example: "Rua das Flores, 123, São Paulo, SP", description: "Address of the user", required: false })
    @IsOptional()
    @IsString()
    address?: string;
}