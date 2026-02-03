import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export enum UserRole {
  CLIENT = 'CLIENT',
  RESTAURANT = 'RESTAURANT',
}

@Entity('users')
export class User {
    @ApiProperty({ example: 1, description: "Unique identifier for the user" })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @Column({ length: 100, nullable: false })
    name: string;

    @ApiProperty({ example: "12345678900", description: "Document number of the user. CPF or CNPJ" })
    @Column({ length: 20, nullable: false, unique: true })
    document: string;
  
    @ApiProperty({ example: "email@email.com", description: "Email address of the user" })
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Exclude()
    @Column({ length: 255, nullable: false })
    password: string;
 
    @ApiProperty({
      example: "CLIENT",
      description: "Role of the user",
      enum: UserRole,
    })
    @Column({
      type: 'varchar',
      length: 20,
      nullable: false,
      default: UserRole.CLIENT,
    })
    role: UserRole;

    @ApiProperty({
      example: "Rua das Flores, 123, São Paulo, SP",
      description: "Address of the user",
      required: false,
    })
    @Column({ length: 255, nullable: true })
    address?: string;

    @ApiProperty({ example: true, description: "Indicates if the user is active" })
    @Column({ default: true })
    active: boolean;
 
    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the user was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-01T01:00:00Z", description: "Date when the user was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;
}