import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let token: any;
  let userId: any;
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /user/register - Should register a new user", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: 'Root User',
        email: 'root@root.com',
        password: 'Root@1234!',
        role: 'CLIENT',
      })
      .expect(201)

    userId = resposta.body.id;
  });

  it("POST /user/register - Should not register a duplicate user", async () => {
    await request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: 'Root User',
        email: 'root@root.com',
        password: 'Root@1234!',
        role: 'CLIENT',
      })
      .expect(400)

  });

  it("POST /auth/login - Should authenticate the user (Login)", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: 'root@root.com',
        password: 'Root@1234!',
      })
      .expect(200)

    token = resposta.body.token;
  })

  it("GET /user/all - Should list all users", async () => {
    return request(app.getHttpServer())
      .get('/user/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  })

  it('GET /user/all - Should not list users without token', async () => {
    return request(app.getHttpServer())
      .get('/user/all')
      .send()
      .expect(401);
  });

  it("GET /user/:id - Should get user by ID", async () => {
    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Authorization', `${token}`)
      .send()
      .expect(200)
  })

  it('GET /user/:id - Should not get user by ID without token', async () => {
    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .send()
      .expect(401);
  });

  it("PUT /user/:id - Should update a user", async () => {
    return request(app.getHttpServer())
      .put(`/user/${userId}`)
      .set('Authorization', `${token}`)
      .send({
        name: 'Root User Updated',
      })
      .expect(200)
      .then(resposta => {
        expect("Root User Updated").toEqual(resposta.body.name);
      })
  })

  it('PUT /user/:id - Should not update user without token', async () => {
    return request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send({
        username: 'Root Atualizado',
      })
      .expect(401);
  });

  it("DELETE /user/:id - Should delete a user", async () => {
    return request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', `${token}`)
      .send()
      .expect(204)
  })

  it('DELETE /user/:id - Should not delete user without token', async () => {
    return request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .send()
      .expect(401);
  });
});
