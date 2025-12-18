import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TestService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'sqlite' as const,
            database: ':memory:',
            entities: [],
            synchronize: true,
            logging: false,
            dropSchema: true,
        };
    }
}
