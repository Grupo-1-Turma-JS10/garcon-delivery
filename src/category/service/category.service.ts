import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from "../dto/create-category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>) {}
    
    async create(category: CreateCategoryDto): Promise<Category> {
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
            throw new NotFoundException('Category not found!');

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
    
    async update(id: number, category: CreateCategoryDto): Promise<Category> {
        let searchCategory = await this.findById(id);

        if (!searchCategory || !id)
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