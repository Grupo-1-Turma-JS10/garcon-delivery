import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AddressController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let addressId: number;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

   const registerResponse = await request(app.getHttpServer())
            .post('/user/register')
            .send({
                username: 'OrderItemUser',
                email: 'orderitemuser@domain.com',
                password: 'OrderItem@1234!',
                isActive: true,
            });

        userId = registerResponse.body.id;

       
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

  
  it('POST /address - deve criar um endereço', async () => {
    console.log(token)
    const response = await request(app.getHttpServer())
      .post('/address')
      .set('Authorization', token)
      .send({
        street: 'Rua Teste',
        number: '123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01000-000',
        userId:userId
      })
      .expect(HttpStatus.CREATED);

    addressId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.street).toBe('Rua Teste');
  });

 
  it('GET /address - deve listar endereços', async () => {
    const response = await request(app.getHttpServer())
      .get('/address')
      .set('Authorization', token)
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /address/:id - deve buscar endereço por id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/address/${addressId}`)
      .set('Authorization',token)
      .expect(HttpStatus.OK);

    expect(response.body.id).toBe(addressId);
  });

  
  it('PUT /address/:id - deve atualizar endereço', async () => {
    const response = await request(app.getHttpServer())
      .put(`/address/${addressId}`)
      .set('Authorization',  token)
      .send({
        city: 'Rio de Janeiro',
      })
      .expect(HttpStatus.OK);

    expect(response.body.city).toBe('Rio de Janeiro');
  });

  
  it('DELETE /address/:id - deve remover endereço', async () => {
    await request(app.getHttpServer())
      .delete(`/address/${addressId}`)
      .set('Authorization', token)
      .expect(HttpStatus.NO_CONTENT);
  });
});
