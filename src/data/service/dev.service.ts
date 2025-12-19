import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { Product } from "../../product/entities/product.entity";
import { Category } from "../../category/entities/category.entity";
import { Order } from "../../order/entities/order.entity";
import { OrderItem } from "../../order/entities/order-item.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: process.env.DB_TYPE as 'mysql' || 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_DATABASE || 'db_garcon_delivery',
            entities: [User, Address, Product, Category, Order, OrderItem],
            synchronize: true,
        };
    }
}
