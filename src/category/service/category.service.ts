import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "../category/category.entity";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: Repository<Category>) {}
}