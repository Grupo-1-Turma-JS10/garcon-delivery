import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";
 
export class UsuarioLogin {
    @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
    @IsEmail()
    email: string;
 
    @ApiProperty({ example: 'strongPassword123!', description: 'User password' })
    @IsStrongPassword()
    password: string;
}