import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity('tb_category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false, unique: true })
    name: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Product, product => product.category)
    products: Product[];
}