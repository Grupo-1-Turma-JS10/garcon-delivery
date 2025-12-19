import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category- test (e2e)', () => {
  let app: INestApplication;
  let token: any;
  let userId: any;
  let categoryId: number;

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

  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /category - Should create a new category", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/category')
      .set('Authorization', token)
      .send({
        name: 'Test Category',
        description: 'A category for testing'
      })
      .expect(201)

    expect(resposta.body).toHaveProperty('id');
    categoryId = resposta.body.id;
  });

  it('POST /categor should not create without token', async () => {
    await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Test Category',
        description: 'A category for testing'
      })
      .expect(401);
  });

  it('GET /category - Should get all categories', async () => {
    const resposta = await request(app.getHttpServer())
      .get('/category')
      .set('Authorization', token)
      .expect(200);

    expect(Array.isArray(resposta.body)).toBe(true);
  });

  it('GET /category should not get categories without token', async () => {
    await request(app.getHttpServer())
      .get('/category')
      .expect(401);
  });

it('PUT /category/:id should not update without token', async () => {
        await request(app.getHttpServer())
            .put(`/category/${categoryId}`)
            .expect(401);
    });

    it('PUT /category/:id - Should update a category', async () => {
        const resposta = await request(app.getHttpServer())
            .put(`/category/${categoryId}`)
            .set('Authorization', token)
            .send({
                name: 'Updated Test Category',
                description: 'An updated category for testing'
            })
            .expect(200);

        expect(resposta.body.name).toBe('Updated Test Category');
    });


});
