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
let refreshToken: string;

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

    test('POST /api/users create user', async () => {
        const user = { name: 'test user', password: 'test' };

        const image = Buffer.from('../uploads/photos/1705835372383-י שבט.jpeg');

        const createUserRes = await request(server.getApp())
            .post('/api/users')
            .attach('image', image, 'test.jpeg')
            .field('name', user.name)
            .field('password', user.password);

        expect(createUserRes.status).toBe(201);

        config.server.tokenExpiration = '1s';
        const response = await request(server.getApp()).post('/api/users/login').send(user);

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');

        token = response.body.token;
        refreshToken = response.body.refreshToken;
        expect(token).toBeDefined();
        expect(refreshToken).toBeDefined();
    });

    test('GET /api/users', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await request(server.getApp()).get('/api/users').set('Authorization', token);
        expect(response.status).toBe(401);

        const refreshRes = await request(server.getApp()).get('/api/users/refresh').set('refreshtoken', refreshToken);
        expect(refreshRes.status).toBe(200);
        token = refreshRes.body.token;

        const newTokenRes = await request(server.getApp()).get('/api/users').set('Authorization', token);
        expect(newTokenRes.status).toBe(200);
    });

    test('GET /api/users/logout & refreshtoken - refreshtoken fail', async () => {
        const response = await request(server.getApp()).post('/api/users/logout').set('Authorization', token).set('refreshtoken', refreshToken);
        expect(response.status).toBe(200);

        const refreshRes = await request(server.getApp()).get('/api/users/refresh').set('refreshtoken', refreshToken);
        expect(refreshRes.status).toBe(404);
    });
});
