import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtAuthGuard } from '../src/auth/guard/jwt-auth-guard';
import { OrderStatus } from '../src/order/dto/create-order.dto';
import { Address } from '../src/address/entities/address.entity';

describe('Order System (e2e)', () => {
  let app: INestApplication;
let token: string;
    let userId: number;
let addressId: Address;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        // Criar usuário
        const registerResponse = await request(app.getHttpServer())
            .post('/user/register')
            .send({
                username: 'OrderItemUser',
                email: 'orderitemuser@domain.com',
                password: 'OrderItem@1234!',
                isActive: true,
            });

        userId = registerResponse.body.id;

        // Fazer login
        const loginResponse = await request(app.getHttpServer())
            .post("/auth/login")
            .send({
                email: 'orderitemuser@domain.com',
                password: 'OrderItem@1234!',
            });

        token = loginResponse.body.token;

        const addressResponse = await request(app.getHttpServer())
            .post('/address')
            .set('Authorization', token)
            .send({
                userId: userId,
                street: '123 Test St',
                number: '456',
                neighborhood: 'Test Neighborhood',
                city: 'Test City',
                state: 'TS',
                zipCode: '12345-678'
            });

        addressId = addressResponse.body.id;
    });
  
  
  afterAll(async () => {
        await app.close();
    });

  describe('Order Flow', () => {
    it('/orders (POST) - Deve criar um pedido', async () => {
      const response = await request(app.getHttpServer())
        .post('/order') 
        .set('Authorization', token)
        .send({
          userId: userId,
          addressId: addressId,
          status: OrderStatus.PENDING
        })
        .expect(201);
     
    });

    it('/orders (GET) - Deve listar pedidos', () => {
      return request(app.getHttpServer())
        .get('/order')
        .set('Authorization', token)
        .expect(200);
    });
  });
});