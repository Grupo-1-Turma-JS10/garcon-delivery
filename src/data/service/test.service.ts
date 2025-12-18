import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { Product } from "../../product/entities/product.entity";
import { Category } from "../../category/category/category.entity";
import { Order } from "../../order/entities/order.entity";
import { OrderItem } from "../../order/entities/order-item.entity";

@Injectable()
export class TestService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite' as const,
            database: ':memory:',
            entities: [User, Address, Product, Category, Order, OrderItem],
            synchronize: true,
            logging: false,
            dropSchema: true,
        };
    }
}
