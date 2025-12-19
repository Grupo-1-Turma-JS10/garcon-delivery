import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import request from 'supertest';
import { Address } from "../src/address/entities/address.entity";

describe('OrderItem (e2e)', () => {
    let token: string;
    let userId: number;
    let app: INestApplication<App>;
    let orderId: number;
    let productId: number;
    let orderItemId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
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

        const categoryResponse = await request(app.getHttpServer())
            .post('/category')
            .set('Authorization', token)
            .send({
                name: 'Test Category',
                description: 'A category for testing'
            });

        const categoryId = categoryResponse.body.id;

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

        const addressId = addressResponse.body.id;

        const orderResponse = await request(app.getHttpServer())
            .post('/order')
            .set('Authorization', token)
            .send({
                userId: userId,
                addressId: addressId,
                totalAmount: 59.99,
                status: 'PENDING'
            });

        orderId = orderResponse.body.id;

        const productResponse = await request(app.getHttpServer())
            .post('/product')
            .set('Authorization', token)
            .send({
                name: 'Test Product',
                description: 'A product for testing order items',
                price: 29.99,
                categoryId: categoryId
            });

        productId = productResponse.body.id;
    });

    afterAll(async () => {
        await app.close();
    });

    it("POST /order-item - Should create a new order item", async () => {
        const payload = {
            orderId: orderId,
            productId: productId,
            quantity: 2,
            unitPrice: 19.99
        };

        const resposta = await request(app.getHttpServer())
            .post('/order-item')
            .set('Authorization', token)
            .send(payload);

        expect(resposta.status).toBe(201);
        expect(resposta.body).toHaveProperty('id');

        orderItemId = resposta.body.id;
    });

    it('POST /order-item - Should not create order item without token', async () => {
        const payload = {
            orderId: orderId,
            productId: productId,
            quantity: 2,
            unitPrice: 19.99
        };

        return request(app.getHttpServer())
            .post('/order-item')
            .send(payload)
            .expect(401);
    });

    it("GET /order-item - Should retrieve all order items", async () => {
        const resposta = await request(app.getHttpServer())
            .get('/order-item')
            .set('Authorization', token)
            .send();

        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    it('GET /order-item - Should not retrieve order items without token', async () => {
        return request(app.getHttpServer())
            .get('/order-item')
            .send()
            .expect(401);
    });

    it("GET /order-item/order/:orderId - Should retrieve order items by order ID", async () => {
        const resposta = await request(app.getHttpServer())
            .get(`/order-item/order/${orderId}`)
            .set('Authorization', token)
            .send();

        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    it('GET /order-item/order/:orderId - Should not retrieve order items by order ID without token', async () => {
        return request(app.getHttpServer())
            .get(`/order-item/order/${orderId}`)
            .send()
            .expect(401);
    });

    it('PUT /order-item/:id - Should update an existing order item', async () => {
        const payload = {
            quantity: 3,
            unitPrice: 17.99
        };

        const resposta = await request(app.getHttpServer())
            .patch(`/order-item/${orderItemId}`)
            .set('Authorization', token)
            .send(payload);

        expect(resposta.status).toBe(200);
        expect(resposta.body.quantity).toBe(3);
        expect(resposta.body.unitPrice).toBe(17.99);
    });

    it('PUT /order-item/:id - Should not update order item without token', async () => {
        const payload = {
            quantity: 3,
            unitPrice: 17.99
        };

        return request(app.getHttpServer())
            .patch(`/order-item/${orderItemId}`)
            .send(payload)
            .expect(401);
    });

    it('DELETE /order-item/:id - Should delete an order item by its ID', async () => {
        const resposta = await request(app.getHttpServer())
            .delete(`/order-item/${orderItemId}`)
            .set('Authorization', token)
            .send();

        expect(resposta.status).toBe(204);
    });

    it('DELETE /order-item/:id - Should not delete order item without token', async () => {
        return request(app.getHttpServer())
            .delete(`/order-item/${orderItemId}`)
            .send()
            .expect(401);
    });
});