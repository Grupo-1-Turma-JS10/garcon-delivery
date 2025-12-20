import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let productId: number;
  let restaurantId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Criar usuário restaurante
    const userResponse = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: 'Restaurant User',
        email: 'restaurant@domain.com',
        password: 'Restaurant@1234!',
        role: 'RESTAURANT',
      });

    restaurantId = userResponse.body.id;

    // Fazer login
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'restaurant@domain.com',
        password: 'Restaurant@1234!',
      });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /product - Deve criar um produto', async () => {
    const response = await request(app.getHttpServer())
      .post('/product')
      .set('Authorization', token)
      .send({
        restaurantId: restaurantId,
        name: 'Burger Delux',
        price: 29.99,
        description: 'Delicioso burger com carne, queijo e alface',
        available: true
      })
      .expect(201);

    productId = response.body.id;
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Burger Delux');
    expect(response.body.available).toBe(true);
  });

  it('GET /product - Deve listar todos os produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/product')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /product/:id - Deve buscar produto por ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/product/${productId}`)
      .set('Authorization', token)
      .expect(200);

    expect(response.body.id).toBe(productId);
    expect(response.body.name).toBe('Burger Delux');
  });

  it('GET /product/name/:name - Deve buscar produto por nome', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/name/Burger')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /product/available - Deve listar produtos disponíveis', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/available')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('PUT /product/:id - Deve atualizar um produto', async () => {
    const response = await request(app.getHttpServer())
      .put(`/product/${productId}`)
      .set('Authorization', token)
      .send({
        price: 34.99,
        available: false
      })
      .expect(200);

    expect(parseFloat(response.body.price)).toBe(34.99);
    expect(response.body.available).toBe(false);
  });

  it('DELETE /product/:id - Deve deletar um produto', async () => {
    return request(app.getHttpServer())
      .delete(`/product/${productId}`)
      .set('Authorization', token)
      .expect(204);  });
});