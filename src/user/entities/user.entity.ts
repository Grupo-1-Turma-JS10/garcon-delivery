import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Address } from "../../address/entities/address.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_user')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column({ length: 100, nullable: false })
    name: string;
  
    @ApiProperty({example:"email@email.com"})
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Column({ length: 255, nullable: false })
    password: string;
 
    @Column({ type: 'boolean', default: true })
    isActive: boolean;
 
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiProperty()
    @OneToMany(() => Address, address => address.user)
    addresses: Address[];
 
    @ApiProperty()
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}