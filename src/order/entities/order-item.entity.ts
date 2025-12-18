import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('tb_order_item')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    orderId: number;

    @Column({ type: 'int', nullable: false })
    productId: number;

    @Column({ type: 'int', nullable: false })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    unitPrice: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
}