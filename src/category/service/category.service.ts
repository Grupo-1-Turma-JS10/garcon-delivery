import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>) {}
    
    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }
   
    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({
            relations: {
               products: true 
            }
        });
    }

    async findById(id: number): Promise<Category> {
        let category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                products: true 
            }
        });

        if (!category)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

        return category;
    }
  
    async findByName(tipo: string): Promise<Category[]> {
        return await this.categoryRepository.find({
            where: {
                name: ILike(`%${tipo}%`)
            },
            relations: {
                products: true               
            }
        });
    }
    
    async update(category: Category): Promise<Category> {
        let searchCategory = await this.findById(category.id);

        if (!searchCategory || !category.id)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

        return await this.categoryRepository.save(category);
    }

    async delete(id: number): Promise<DeleteResult> {
        let searchCategory = await this.findById(id);

        if (!searchCategory)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

        return await this.categoryRepository.delete(id);
    }
}