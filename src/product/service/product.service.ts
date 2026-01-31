import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly userService: UserService,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({
            relations: {
                restaurant: true,
            }
        });
    }

    async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                restaurant: true,
            }
        });

        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async findByName(name: string): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            },
            relations: {
                restaurant: true,
            }
        });
    }

    async findByRestaurantId(restaurantId: number): Promise<Product[]> {
        this.logger.log(`Finding products for restaurant: ${restaurantId}`);

        try {
            const products = await this.productRepository.find({
                where: {
                    restaurant: { id: restaurantId }
                },
                relations: {
                    restaurant: true,
                }
            });

            if (products.length === 0) 
                this.logger.warn(`No products found for restaurant: ${restaurantId}`);

            return products;
        } catch (error) {
            this.logger.error(`Error finding products for restaurant: ${restaurantId}`, error.stack);
            throw new InternalServerErrorException('Error retrieving products by restaurant.');
        }
    }

    async findAvailable(): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                available: true
            },
            relations: {
                restaurant: true,
            }
        });
    }

    async create(dto: CreateProductDto): Promise<Product> {
        try {
            const restaurant = await this.userService.findById(dto.restaurantId);

            const product = this.productRepository.create({
                name: dto.name,
                description: dto.description,
                price: dto.price,
                available: dto.available ?? true,
                category: dto.category,
                imageUrl: dto.imageUrl,
                restaurant,
            });

            return await this.productRepository.save(product);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Error creating product: ' + error.message);
        }
    }

    async update(id: number, dto: UpdateProductDto): Promise<Product> {
        try {
            const result = await this.productRepository.update(id, {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                available: dto.available,
            });

            if (result.affected === 0) {
                throw new NotFoundException('Product not found');
            }

            return this.findById(id);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Error updating product: ' + error.message);
        }
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.productRepository.delete(id);
    }
}