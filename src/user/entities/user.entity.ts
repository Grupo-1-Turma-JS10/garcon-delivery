import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Address } from "../../address/entities/address.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";

@Entity('tb_user')
export class User {
    @ApiProperty({ example: 1, description: "Unique identifier for the user" })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @Column({ length: 100, nullable: false })
    name: string;
  
    @ApiProperty({ example: "email@email.com", description: "Email address of the user" })
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @ApiProperty({ example: "strongPassword123", description: "Password of the user" })
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @Column({ length: 30, nullable: false })
    password: string;
 
    @ApiProperty({ example: true, description: "Indicates if the user is active" })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
 
    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the user was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-02T00:00:00Z", description: "Date when the user was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiProperty({ type: () => Address, isArray: true })
    @OneToMany(() => Address, address => address.user)
    addresses: Address[];
 
    @ApiProperty({ type: () => Order, isArray: true })
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}