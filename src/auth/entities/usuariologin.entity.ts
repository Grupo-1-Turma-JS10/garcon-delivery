import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
 
export class UsuarioLogin {
    @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
    @IsEmail()
    email: string;
 
    @ApiProperty({ example: 'strongPassword123!', description: 'User password' })
    password: string;
}