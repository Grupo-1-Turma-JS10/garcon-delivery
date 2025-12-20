import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { OrderStatus } from './../src/order/entities/order.entity';

describe('Order System (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let clientId: number;
  let restaurantId: number;
  let orderId: number;
  let productIds: number[] = [];

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Criar usuário cliente
    const clientRegisterResponse = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: 'Order Client',
        email: 'client@domain.com',
        password: 'Client@1234!',
        role: 'CLIENT',
      });

    clientId = clientRegisterResponse.body.id;

    // Criar usuário restaurante
    const restaurantRegisterResponse = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: 'Order Restaurant',
        email: 'restaurant@domain.com',
        password: 'Restaurant@1234!',
        role: 'RESTAURANT',
      });

    restaurantId = restaurantRegisterResponse.body.id;

    // Fazer login como cliente
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'client@domain.com',
        password: 'Client@1234!',
      });

    token = loginResponse.body.token;

    // Criar alguns produtos para usar nos testes (como restaurante)
    const restaurantLoginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'restaurant@domain.com',
        password: 'Restaurant@1234!',
      });

    const restaurantToken = restaurantLoginResponse.body.token;

    for (let i = 1; i <= 3; i++) {
      const productResponse = await request(app.getHttpServer())
        .post('/product')
        .set('Authorization', restaurantToken)
        .send({
          restaurantId: restaurantId,
          name: `Product ${i}`,
          price: 10 * i,
          description: `Description for product ${i}`,
          available: true
        });
      productIds.push(productResponse.body.id);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Order Flow', () => {
    it('POST /order - Deve criar um pedido com um produto', async () => {
      const response = await request(app.getHttpServer())
        .post('/order')
        .set('Authorization', token)
        .send({
          clientId: clientId,
          restaurantId: restaurantId,
          items: [
            { productId: productIds[0], quantity: 1 }
          ]
        })
        .expect(201);

      orderId = response.body.id;
      expect(response.body).toHaveProperty('id');
      expect(response.body.items).toBeDefined();
      expect(response.body.items.length).toBe(1);
      expect(response.body.items[0].name).toBe('Product 1');
      expect(response.body.items[0].price).toBe(10);
      expect(response.body.total).toBe(10);
    });

    it('POST /order - Deve criar um pedido com produtos', async () => {
      const response = await request(app.getHttpServer())
        .post('/order')
        .set('Authorization', token)
        .send({
          clientId: clientId,
          restaurantId: restaurantId,
          items: [
            { productId: productIds[0], quantity: 1 },
            { productId: productIds[1], quantity: 1 }
          ]
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.items).toBeDefined();
      expect(Array.isArray(response.body.items)).toBe(true);
      expect(response.body.items.length).toBe(2);
      expect(parseFloat(response.body.total)).toBe(30.00);
    });

    it('POST /order - Deve criar outro pedido com 3 produtos', async () => {
      const response = await request(app.getHttpServer())
        .post('/order')
        .set('Authorization', token)
        .send({
          clientId: clientId,
          restaurantId: restaurantId,
          items: [
            { productId: productIds[0], quantity: 1 },
            { productId: productIds[1], quantity: 1 },
            { productId: productIds[2], quantity: 1 }
          ]
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.items).toBeDefined();
      expect(Array.isArray(response.body.items)).toBe(true);
      expect(response.body.items.length).toBe(3);
      expect(parseFloat(response.body.total)).toBe(60.00);
    });

    it('GET /order - Deve listar pedidos com produtos carregados', async () => {
      const response = await request(app.getHttpServer())
        .get('/order')
        .set('Authorization', token)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /order/:id - Deve buscar pedido por ID com produtos carregados', async () => {
      // Pegar o primeiro pedido
      const response = await request(app.getHttpServer())
        .get(`/order/${orderId}`)
        .set('Authorization', token)
        .expect(200);

      expect(response.body.id).toBe(orderId);
      expect(response.body.items).toBeDefined();
      expect(Array.isArray(response.body.items)).toBe(true);
    });

    it('PUT /order/:id - Deve atualizar um pedido', async () => {
      const response = await request(app.getHttpServer())
        .put(`/order/${orderId}`)
        .set('Authorization', token)
        .send({
          status: OrderStatus.CONFIRMED
        })
        .expect(200);

      expect(response.body.status).toBe(OrderStatus.CONFIRMED);
    });

    it('DELETE /order/:id - Deve deletar um pedido', async () => {
      // Criar um order novo para deletar
      const response = await request(app.getHttpServer())
        .post('/order')
        .set('Authorization', token)
        .send({
          clientId: clientId,
          restaurantId: restaurantId,
          items: [
            { productId: productIds[0], name: 'Product 1', price: 10, quantity: 1 }
          ],
          total: 10
        });

      const orderToDelete = response.body.id;

      return request(app.getHttpServer())
        .delete(`/order/${orderToDelete}`)
        .set('Authorization', token)
        .expect(204);
    });
  });
});