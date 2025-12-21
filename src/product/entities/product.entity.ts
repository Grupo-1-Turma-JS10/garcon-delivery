import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";

@Entity('products')
export class Product {
    @ApiProperty({ example: 1, description: "Unique identifier for the product" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: User, description: "Restaurant that offers this product" })
    @ManyToOne(() => User)
    restaurant: User;

    @ApiProperty({ example: "Burger", description: "Name of the product" })
    @Column({ length: 100, nullable: false })
    name: string;

    @ApiProperty({
        example: "A delicious burger with lettuce, tomato and cheese",
        description: "Description of the product",
        required: false,
    })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty({ example: 25.50, description: "Price of the product" })
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ApiProperty({ example: true, description: "Whether the product is available" })
    @Column({ default: true })
    available: boolean;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the product was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-01T01:00:00Z", description: "Date when the product was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;
}