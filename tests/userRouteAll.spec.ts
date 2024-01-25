import App from '../src/infra/express/app';
import AuthMock from './mocks/auth';
import { UserController } from '../src/infra/express/controllers/user.controller';
import { UserService } from '../src/services/user.service';
import UserRouter from '../src/infra/express/routers/user.route';
import * as request from 'supertest';
import { verify } from 'jsonwebtoken';
import config from '../src/config/config';
import UserRepoMock from './mocks/userRepo';
import { encrypt } from '../src/utils/encrypt';
import Logger from '../src/infra/winston/logger';
import { TokenRepoMock } from './mocks/tokenRepo';

let server: App;
let token: string;
const idToDelete = 'to_delete';

jest.setTimeout(60000);

describe('User routes', () => {
    beforeAll(async () => {
        const auth = new AuthMock(async (token) => {
            const payload = verify(token, config.keys.tokenKey);
            return payload.toString();
        });
        const repo = new UserRepoMock();
        repo.create({ _id: '1', name: 'test user', password: encrypt('test') });
        repo.create({ _id: idToDelete, name: 'test user', password: encrypt('test') });

        const tokenRepo = new TokenRepoMock();
        const logger = new Logger();
        const userService = new UserService(repo, logger, tokenRepo);
        const userController = new UserController(userService);

        const userRouter = new UserRouter(userController, auth.check);

        server = new App(5770, [userRouter]);
    });

    afterAll(async () => {
        await server.stop();
    });

    test('POST /api/users/login', async () => {
        const response = await request(server.getApp()).post('/api/users/login').send({ name: 'test user', password: 'test' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('POST /api/users/login wrong password', async () => {
        const response = await request(server.getApp()).post('/api/users/login').send({ name: 'test user', password: 'test2' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to login');
    });

    test('POST /api/users/login wrong name', async () => {
        const response = await request(server.getApp()).post('/api/users/login').send({ name: 'test user lol', password: 'test' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to login');
    });

    test('GET /api/users', async () => {
        const response = await request(server.getApp()).get('/api/users').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /api/users/:id', async () => {
        const response = await request(server.getApp()).get('/api/users/1').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ _id: '1', name: 'test user' });
    });

    test('GET /api/users/:id not exist i', async () => {
        const response = await request(server.getApp()).get('/api/users/6').set('Authorization', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    test('POST /api/users', async () => {
        const user = { name: 'POST/api/users', password: 'test' };

        const image = Buffer.from('../uploads/photos/1705835372383-י שבט.jpeg');

        const response = await request(server.getApp())
            .post('/api/users')
            .attach('image', image, 'test.jpeg')
            .field('name', user.name)
            .field('password', user.password);

        expect(response.status).toBe(201);
        expect(response.body.name).toEqual('POST/api/users');
    });

    test('POST /api/users not enough fields', async () => {
        const response = await request(server.getApp()).post('/api/users').set('Authorization', token).send({ name: 'test user 2' });
        expect(response.status).toBe(400);
    });

    test('PUT /api/users/:id', async () => {
        const response = await request(server.getApp()).put('/api/users/1').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('new name');
    });

    test('PUT /api/users/:id not exist id', async () => {
        const response = await request(server.getApp()).put('/api/users/9').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to update user');
    });

    test('PUT /api/users/:id not enough fields', async () => {
        const response = await request(server.getApp()).put('/api/users/1').set('Authorization', token).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.name" is required');
    });

    test('DELETE /api/users/:id', async () => {
        const response = await request(server.getApp()).delete(`/api/users/${idToDelete}`).set('Authorization', token);
        expect(response.status).toBe(200);
        const userResp = await request(server.getApp()).get(`/api/users/${idToDelete}`).set('Authorization', token);
        expect(userResp.status).toBe(404);
    });

    test('DELETE /api/users/:id not exist id', async () => {
        const response = await request(server.getApp()).delete('/api/users/9').set('Authorization', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to delete user');
    });
});
