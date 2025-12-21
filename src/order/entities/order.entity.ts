import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export enum OrderStatus {
    CREATED = 'CREATED',
    CONFIRMED = 'CONFIRMED',
    DELIVERING = 'DELIVERING',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED',
}

export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    observations?: string;
}

@Entity('orders')
export class Order {
    @ApiProperty({ example: 1, description: "Unique identifier for the order" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        example: [
            { productId: 1, name: "Burguer", price: 25.50, quantity: 2, observations: "No onions, please." },
            { productId: 2, name: "Coca Cola", price: 8.00, quantity: 2, observations: "Extra ice." },
        ],
        description: "Items included in this order",
    })
    @Column({ type: 'json' })
    items: OrderItem[];

    @ApiProperty({ example: 119.97, description: "Total price of the order" })
    @Column('decimal', { precision: 10, scale: 2 })
    @IsNumber()
    total: number;

    @ApiProperty({
        example: "CREATED",
        description: "Current status of the order",
        enum: OrderStatus,
    })
    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        default: OrderStatus.CREATED,
    })
    status: OrderStatus;

    @ApiProperty({ example: User, description: "Client user" })
    @ManyToOne(() => User)
    client: User;

    @ApiProperty({ example: User, description: "Restaurant user" })
    @ManyToOne(() => User)
    restaurant: User;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the order was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-01T01:00:00Z", description: "Date when the order was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;
}