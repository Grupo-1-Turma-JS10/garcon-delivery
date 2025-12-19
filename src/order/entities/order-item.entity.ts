import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_order_item')
export class OrderItem {
    @ApiProperty({ example: 1, description: "Unique identifier for the order item" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: "Identifier of the order this item belongs to" })
    @Column({ type: 'int', nullable: false })
    orderId: number;

    @ApiProperty({ example: 1, description: "Identifier of the product in the order item" })
    @Column({ type: 'int', nullable: false })
    productId: number;

    @ApiProperty({ example: 1, description: "Quantity of the product in the order item" })
    @Column({ type: 'int', nullable: false })
    quantity: number;

    @ApiProperty({ example: "19.99", description: "Unit price of the product in the order item" })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    unitPrice: number;
    
    @ApiProperty({ type: () => Order })
    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;
}