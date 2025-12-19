import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
   
    @ApiProperty({ example: "Rua das Flores", description: "Street name of the address" }) 
    @Column({ length: 100, nullable: false })
    street: string;
   
    @ApiProperty({ example: "123", description: "Address number" }) 
    @Column({ length: 10, nullable: false })
    number: string;
    
    @ApiProperty({ example: "São Paulo", description: "City name of the address" }) 
    @Column({ length: 50, nullable: false })
    city: string;
    
    @ApiProperty({ example: "SP", description: "State name of the address" }) 
    @Column({ length: 50, nullable: false })
    state: string;

    @ApiProperty({ example: "01001-000", description: "Postal code of the address" }) 
    @Column({ length: 20, nullable: false })
    zipCode: string;
    
    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Address creation date" }) 
    @CreateDateColumn()
    createdAt: Date;
    
    @ApiProperty({ example: "2023-01-02T00:00:00Z", description: "Address update date" }) 
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiProperty({ example: "Apto 101", description: "Address complement" }) 
    @Column({ length: 100, nullable: true })
    complement?: string;

    @ApiProperty({ type: () => User })
    @ManyToOne(() => User, user => user.addresses)
    user: User;
    
    @ApiProperty({ type: () => Order, isArray: true })
    @OneToMany(() => Order, order => order.address)
    orders: Order[];
}