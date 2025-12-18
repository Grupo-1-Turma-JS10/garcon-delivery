import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
   
    @ApiProperty() 
    @Column({ length: 100, nullable: false })
    street: string;
   
    @ApiProperty() 
    @Column({ length: 10, nullable: false })
    number: string;
    
    @ApiProperty() 
    @Column({ length: 50, nullable: false })
    city: string;
    
    @ApiProperty() 
    @Column({ length: 50, nullable: false })
    state: string;

    @ApiProperty() 
    @Column({ length: 20, nullable: false })
    zipCode: string;
    
    @ApiProperty() 
    @CreateDateColumn()
    createdAt: Date;
    
    @ApiProperty() 
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ApiProperty() 
    @Column({ length: 100, nullable: true })
    complement?: string;

    @ApiProperty() 
    @ManyToOne(() => User, user => user.addresses)
    user: User;
    
    @ApiProperty() 
    @OneToMany(() => Order, order => order.address)
    orders: Order[];
}