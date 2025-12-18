import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProdService } from "../data/service/prod.service";
import { ProductController } from "./controller/product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProdService],
})
export class CategoryModule {}