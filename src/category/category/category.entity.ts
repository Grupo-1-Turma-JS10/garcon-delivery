import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_category')
export class Category {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 100, nullable: false, unique: true })
    name: string;

    @ApiProperty()
    @Column({ length: 255, nullable: true })
    description?: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ApiProperty()
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}