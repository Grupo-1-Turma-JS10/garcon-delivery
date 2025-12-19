import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_category')
export class Category {

    @ApiProperty({ example: 1, description: "Unique identifier for the category" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Electronics", description: "Name of the category" })
    @Column({ length: 100, nullable: false, unique: true })
    name: string;

    @ApiProperty({ example: "Category for electronic products", description: "Description of the category" })
    @Column({ length: 255, nullable: true })
    description?: string;

    @ApiProperty({ example: "2023-01-01T00:00:00Z", description: "Category creation date" })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ example: "2023-01-02T00:00:00Z", description: "Category update date" })
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty({ type: () => Product, isArray: true })
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}