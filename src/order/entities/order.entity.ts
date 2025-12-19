import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
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
    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @ApiProperty({ example: "pendente", description: "Current status of the order" })
    @Column({
        type: 'varchar',
        length: 50,
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

    @ApiProperty({ example: 119.97, description: "Total price of the order" })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
    totalPrice: number;

    // Campos de entrega
    @ApiProperty({ example: "Rua das Flores", description: "Street name of the delivery address" })
    @Column({ length: 100, nullable: false })
    street: string;

    @ApiProperty({ example: "123", description: "Number of the delivery address" })
    @Column({ length: 10, nullable: false })
    number: string;

    @ApiProperty({ example: "Bairro Jardim", description: "Neighborhood of the delivery address" })
    @Column({ length: 50, nullable: false })
    neighborhood: string;

    @ApiProperty({ example: "São Paulo", description: "City of the delivery address" })
    @Column({ length: 50, nullable: false })
    city: string;

    @ApiProperty({ example: "SP", description: "State of the delivery address" })
    @Column({ length: 50, nullable: false })
    state: string;

    @ApiProperty({ example: "01001-000", description: "Postal code of the delivery address" })
    @Column({ length: 20, nullable: false })
    zipCode: string;

    @ApiProperty({ example: "Apto 101", description: "Additional delivery address information", required: false })
    @Column({ length: 100, nullable: true })
    complement?: string;

    @Exclude()
    @ManyToOne(() => User, user => user.orders)
    user: User;
}