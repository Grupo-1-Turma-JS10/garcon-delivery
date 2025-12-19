import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }


    async findAll(): Promise<Product[]> {

        return await this.productRepository.find();
    }

    async findById(id: number): Promise<Product> {

        const product = await this.productRepository.findOne({
            where: {
                id,
            },
        });

        if (!product) {
            console.log("entrou aqui")
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async findByName(name: string): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            },
        });
    }

    async findByCategory(category: string): Promise<Product[]> {
        this.logger.log(`Finding products in category: ${category}`);

        try {
            const products: Product[] = await this.productRepository.find({
                where: {
                    category: ILike(`%${category}%`)
                },
            });

            if (products.length === 0) this.logger.warn(`No products found in category: ${category}`);

            return products;
        } catch (error) {
            this.logger.error(`Error finding products in category: ${category}`, error.stack);
            throw new InternalServerErrorException('Error retrieving products by category.');
        }

    }

    async create(product: CreateProductDto): Promise<Product> {

        try {
            const newProduct = this.productRepository.create(product);

            return await this.productRepository.save(newProduct);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error creating product.');
        }

    }

    async update(id: number, product: UpdateProductDto): Promise<Product> {

        try {
            const result = await this.productRepository.update(id, product);
            if (result.affected === 0) {
                throw new NotFoundException('Produto não encontrado');
            }
            
            return this.findById(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating product.');
        }

    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.productRepository.delete(id);
    }
}