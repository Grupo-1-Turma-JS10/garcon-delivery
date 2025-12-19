import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/service/dev.service';
import { ProdService } from './data/service/prod.service';
import { AppController } from './app.controller';
import { TestService } from './data/service/test.service';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: AppModule.getDatabaseService(),
      imports: [ConfigModule],
    }),
    AuthModule,
    AddressModule,
    CategoryModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  private static getDatabaseService() {
    const env = process.env.NODE_ENV || 'development';
    const services = {
      development: DevService,
      test: TestService,
      production: ProdService,
    };
    return services[env] || DevService;
  }
}
