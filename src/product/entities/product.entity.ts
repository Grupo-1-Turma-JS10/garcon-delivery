import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum categoryEnum {
    LANCHE = 'Lanche',
    COMIDA_BRASILEIRA = 'Comida Brasileira',
    COMIDA_SAUDAVEL = 'Comida Saudável',
    SALAD = 'Salada',
    MAIN_COURSE = 'Prato Principal',
    DESSERT = 'Sobremesa',
    BEVERAGE = 'Bebida',
    APPETIZER = 'Entrada',
    ITALIAN = 'Italian',
    MEXICAN = 'Mexican',
    ASIAN = 'Asian',
    VEGETARIAN = 'Vegetariano',
    VEGAN = 'Vegano',
    GLUTEN_FREE = 'Sem Glúten',
    KETO = 'Keto',
    PALEO = 'Paleo',
    UNCATAGORIZED = 'Uncategorized',
}

@Entity('tb_product')
export class Product {
    @ApiProperty({ example: 1, description: "Unique identifier for the product" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Cesar Salad", description: "Name of the product" })
    @Column({ length: 100, nullable: false })
    name: string;

    @ApiProperty({ example: "499.99", description: "Price of the product" })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @ApiProperty({ example: "A fresh Cesar Salad with romaine lettuce, croutons, and parmesan cheese", description: "Description of the product" })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty({ example: "Salad", description: "Category of the product" })
    @Column({ length: 50, nullable: false, default: 'Uncategorized' })
    category: categoryEnum;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Date when the product was created" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-02T00:00:00Z", description: "Date when the product was last updated" })
    @UpdateDateColumn()
    updatedAt: Date;
}