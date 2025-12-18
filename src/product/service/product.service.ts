import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ILike, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
    

    async findAll(): Promise<Product[]>{
        return await this.productRepository.find()
    }

    async findById(id: number): Promise<Product>{
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
        });
        if(!product)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return product;
    }

    async findByName(name: string): Promise<Product[]>{
        return await this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            },
        })
    }

    async create(product: Product): Promise<Product>{
        
        return await this.productRepository.save(product)
    }

    /*async update(product: Product): Promise<Product>{
        await this.findById(product.id);

        await this.
    }*/
}