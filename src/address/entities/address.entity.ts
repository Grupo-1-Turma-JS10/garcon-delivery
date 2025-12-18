import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";

@Entity('tb_address')
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100, nullable: false })
    street: string;

    @Column({ length: 10, nullable: false })
    number: string;

    @Column({ length: 50, nullable: false })
    city: string;

    @Column({ length: 50, nullable: false })
    state: string;

    @Column({ length: 20, nullable: false })
    zipCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ length: 100, nullable: true })
    complement?: string;

    @ManyToOne(() => User, user => user.addresses)
    user: User;

    @OneToMany(() => Order, order => order.address)
    orders: Order[];
}