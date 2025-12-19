import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let productId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Criar usuário
    await request(app.getHttpServer())
      .post('/user/register')
      .send({
        username: 'ProductUser',
        email: 'productuser@domain.com',
        password: 'ProductUser@1234!',
        isActive: true,
      });

    // Fazer login
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'productuser@domain.com',
        password: 'ProductUser@1234!',
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
        name: 'Pizza Margherita',
        price: 29.99,
        description: 'Deliciosa pizza com tomate, mozzarela e manjericão',
        category: 'Pizza'
      })
      .expect(201);

    productId = response.body.id;
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Pizza Margherita');
    expect(response.body.category).toBe('Pizza');
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
    expect(response.body.name).toBe('Pizza Margherita');
  });

  it('GET /product/name/:name - Deve buscar produto por nome', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/name/Pizza')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /product/by-category?category=Pizza - Deve buscar por categoria', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/by-category?category=Pizza')
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
        category: 'Italian'
      })
      .expect(200);

    expect(parseFloat(response.body.price)).toBe(34.99);
    expect(response.body.category).toBe('Italian');
  });

  it('DELETE /product/:id - Deve deletar um produto', async () => {
    return request(app.getHttpServer())
      .delete(`/product/${productId}`)
      .set('Authorization', token)
      .expect(204);
  });

  it('POST /product - Deve falhar sem autenticação', async () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'Teste',
        price: 10,
        category: 'Test'
      })
      .expect(401);
  });
});
