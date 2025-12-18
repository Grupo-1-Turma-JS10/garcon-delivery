import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { OrderItem } from "./order-item.entity";


export enum OrderStatus {
    PENDING = 'pendente',
    PREPARING = 'em_preparacao',
    SHIPPED = 'enviado',
    DELIVERED = 'entregue',
    CANCELLED = 'cancelado',
}

@Entity('tb_order')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', nullable: false })
    orderDate: Date;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
        nullable: false,
    })
    status: OrderStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.orders)
    @Column({ type: 'int', nullable: false })
    userId: number;

    @ManyToOne(() => Address, address => address.orders)
    address: Address;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}