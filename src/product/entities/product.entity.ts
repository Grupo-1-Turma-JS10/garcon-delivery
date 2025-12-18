import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../../category/category/category.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('tb_product')
export class Product {
    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number;
 
   @ApiProperty() 
    @Column({ length: 100, nullable: false })
    name: string;
 
    @ApiProperty() 
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;
 
    @ApiProperty() 
    @Column({ type: 'text', nullable: true })
    description?: string;
 
    @ApiProperty() 
    @CreateDateColumn()
    createdAt: Date;
   
    @ApiProperty() 
    @UpdateDateColumn()
    updatedAt: Date;
 
    @ApiProperty() 
    @ManyToOne(() => Category, category => category.products)
    category: Category;
}