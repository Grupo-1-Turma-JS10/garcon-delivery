import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Address } from "../../address/entities/address.entity";

@Entity('tb_user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @Column({ length: 255, nullable: false })
    password: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}