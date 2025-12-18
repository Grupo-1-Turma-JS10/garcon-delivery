import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: Repository<Product>) {}
}