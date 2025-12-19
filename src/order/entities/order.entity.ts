import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { OrderItem } from "./order-item.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";


export enum OrderStatus {
    PENDING = 'pendente',
    PREPARING = 'em_preparacao',
    SHIPPED = 'enviado',
    DELIVERED = 'entregue',
    CANCELLED = 'cancelado',
}

@Entity('tb_order')
export class Order {
    @ApiProperty({ example: 1, description: "Unique identifier for the order" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the order was placed" })
    @Column({ type: 'datetime', nullable: false })
    orderDate: Date;

    @ApiProperty({ example: "pendente", description: "Current status of the order" })
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
        nullable: false,
    })
    status: OrderStatus;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the order was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-02T00:00:00Z", description: "Date when the order was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    @ManyToOne(() => Address, address => address.orders)
    address: Address;

    @Exclude()
    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Exclude()
    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}