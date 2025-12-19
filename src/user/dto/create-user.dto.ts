import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({ example: "john.doe@example.com", description: "Email address of the user" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "strongPassword123", description: "Password of the user" })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: true, description: "Indicates if the user is active", required: false })
    @IsOptional()
    isActive?: boolean;
}
