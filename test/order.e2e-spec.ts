import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { OrderStatus } from '../src/order/dto/create-order.dto';

describe('Order System (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: number;
  let orderId: number;

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
        username: 'OrderUser',
        email: 'orderuser@domain.com',
        password: 'OrderUser@1234!',
        isActive: true,
      });

    userId = registerResponse.body.id;

    // Fazer login
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'orderuser@domain.com',
        password: 'OrderUser@1234!',
      });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Order Flow', () => {
    it('POST /order - Deve criar um pedido', async () => {
      const response = await request(app.getHttpServer())
        .post('/order')
        .set('Authorization', token)
        .send({
          userId: userId,
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Vila Mariana',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01435-010',
          complement: 'Apto 302',
          status: OrderStatus.PENDING
        })
        .expect(201);

      orderId = response.body.id;
      expect(response.body).toHaveProperty('id');
      expect(response.body.street).toBe('Rua das Flores');
      expect(response.body.city).toBe('São Paulo');
    });

    it('GET /order - Deve listar pedidos', async () => {
      return request(app.getHttpServer())
        .get('/order')
        .set('Authorization', token)
        .expect(200);
    });

    it('GET /order/:id - Deve buscar pedido por ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/order/${orderId}`)
        .set('Authorization', token)
        .expect(200);

      expect(response.body.id).toBe(orderId);
      expect(response.body.street).toBe('Rua das Flores');
    });

    it('PUT /order/:id - Deve atualizar um pedido', async () => {
      const response = await request(app.getHttpServer())
        .put(`/order/${orderId}`)
        .set('Authorization', token)
        .send({
          city: 'Rio de Janeiro',
          status: OrderStatus.PREPARING
        })
        .expect(200);

      expect(response.body.city).toBe('Rio de Janeiro');
      expect(response.body.status).toBe(OrderStatus.PREPARING);
    });

    it('DELETE /order/:id - Deve deletar um pedido', async () => {
      return request(app.getHttpServer())
        .delete(`/order/${orderId}`)
        .set('Authorization', token)
        .expect(204);
    });
  });
});