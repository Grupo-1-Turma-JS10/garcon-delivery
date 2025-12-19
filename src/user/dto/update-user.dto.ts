import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: "John Doe", description: "Name of the user", required: false })
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: "john.doe@example.com", description: "Email address of the user", required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "strongPassword123", description: "Password of the user", required: false })
    @IsOptional()
    @IsString()
    @IsStrongPassword()
    password?: string;
    
    @ApiProperty({ example: true, description: "Indicates if the user is active", required: false })
    @IsOptional()
    isActive?: boolean;
}
