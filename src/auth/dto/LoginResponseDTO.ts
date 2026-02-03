import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";
import { UserRole } from "../../user/entities/user.entity";

export class LoginResponseDTO {
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    name: string;

    @ApiProperty({ example: "email@email.com", description: "Email address of the user" })
    email: string;

    @ApiProperty({
        example: "CLIENT",
        description: "Role of the user",
        enum: UserRole,
    })
    role: UserRole;

    @ApiProperty({
        example: "Rua das Flores, 123, São Paulo, SP",
        description: "Address of the user",
        required: false,
    })
    address?: string;

    @ApiProperty({ example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", description: "JWT token for authentication" })
    token: string;

    @ApiProperty({ example: 1, description: "Unique identifier of the user" })
    id: number;

    @ApiProperty({ example: true, description: "Indicates if the user is active" })
    active: boolean;
}