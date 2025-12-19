import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";
import { Exclude } from "class-transformer";

@Entity('tb_user')
export class User {
    @ApiProperty({ example: 1, description: "Unique identifier for the user" })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @Column({ length: 100, nullable: false })
    username: string;
  
    @ApiProperty({ example: "email@email.com", description: "Email address of the user" })
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Exclude()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @Column({ length: 255, nullable: false })
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
 
    @Exclude()
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}