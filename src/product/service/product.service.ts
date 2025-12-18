import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
    

    async findAll(): Promise<Product[]>{
        
        return await this.productRepository.find({
            relations:{
                category: true,
            },
        });
    }

    async findById(id: number): Promise<Product>{
        
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
            relations:{
                category: true,
            },
        });
        
        if(!product){
            console.log("entrou aqui")
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
        }

        return product;
    }

    async findByName(name: string): Promise<Product[]>{
        return await this.productRepository.find({
            where: {
                name: ILike(`%${name}%`)
            },
            relations:{
                category: true,
            },
        });
    }

    async create(product: Product): Promise<Product>{
        
        return await this.productRepository.save(product)
    }

    async update(product: Product, id: number): Promise<Product>{

        try{

            const updateProdutc = await this.findById(id);
            return await this.productRepository.save(updateProdutc)
        } catch(error){
            if(error instanceof NotFoundException){}
        }
        throw new InternalServerErrorException('Error updating post.');

    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);

        return await this.productRepository.delete(id);
    }
}