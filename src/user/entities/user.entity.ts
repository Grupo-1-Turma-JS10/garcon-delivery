import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Address } from "../../address/entities/address.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";
import { Exclude } from "class-transformer";

@Entity('tb_user')
export class User {
<<<<<<< HEAD
    senha(password: string, senha: any) {
        throw new Error("Method not implemented.");
    }
=======
    @ApiProperty({ example: 1, description: "Unique identifier for the user" })
>>>>>>> main
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ example: "John Doe", description: "Name of the user" })
    @Column({ length: 100, nullable: false })
<<<<<<< HEAD
    username: string;

=======
    name: string;
  
    @ApiProperty({ example: "email@email.com", description: "Email address of the user" })
>>>>>>> main
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Exclude()
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
    
    @Exclude()
    @OneToMany(() => Address, address => address.user)
    addresses: Address[];
 
    @Exclude()
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}