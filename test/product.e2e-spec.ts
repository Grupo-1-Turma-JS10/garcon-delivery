import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let categoryId: number;
  let productId: number;
  let userId: number;

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

        const categoryResponse = await request(app.getHttpServer())
            .post('/category')
            .set('Authorization', token)
            .send({
                name: 'Beverages',
                description: 'All kinds of drinks'
            });

        categoryId = categoryResponse.body.id;
    });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve criar um novo produto', async () => {
    const res = await request(app.getHttpServer())
      .post('/product')
      .set('Authorization', token)
      .send({
        name: 'Cesar Salad',
        price: 499.99,
        description: 'A fresh Cesar Salad with romaine lettuce, croutons, and parmesan cheese',
        categoryId,
      })
      .expect(201);

    productId = res.body.id;
    expect(res.body.name).toBe('Cesar Salad');
    expect(res.body.category.id).toBe(categoryId);
  });

  it('02 - Não deve criar produto com categoria inexistente', async () => {
    await request(app.getHttpServer())
      .post('/product')
      .set('Authorization', token)
      .send({
        name: 'Invalid Product',
        price: 100,
        categoryId: 999,
      })
      .expect(404);
  });

  it('03 - Deve listar todos os produtos', async () => {
    const res = await request(app.getHttpServer())
      .get('/product')
      .set('Authorization', token)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });

  it('04 - Deve listar produto por ID', async () => {
    const res = await request(app.getHttpServer())
      .get(`/product/${productId}`)
      .set('Authorization', token)
      .expect(200);

    expect(res.body.id).toBe(productId);
  });

  it('05 - Deve atualizar um produto', async () => {
    const res = await request(app.getHttpServer())
      .put(`/product/${productId}`)
      .set('Authorization', token)
      .send({ name: 'Cesar Salad Updated', price: 599.99 })
      .expect(200);

    expect(res.body.name).toBe('Cesar Salad Updated');
    expect(res.body.price).toBe(599.99); 
  });
});
