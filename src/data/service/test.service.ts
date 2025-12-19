import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";
import { Order } from "../../order/entities/order.entity";

@Injectable()
export class TestService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite' as const,
            database: ':memory:',
            entities: [User, Product, Order],
            synchronize: true,
            logging: false,
            dropSchema: true,
        };
    }
}
