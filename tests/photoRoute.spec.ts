import { PhotoController } from './../src/infra/express/controllers/photo.controller';
import PhotoRouter from './../src/infra/express/routers/photo.route';
import { PhotoService } from './../src/services/photo.service';
import { photoSchema } from './../src/infra/mongo/models/photo.model';
import { PhotoRepo } from './../src/infra/mongo/repo/photo.repo';
import App from '../src/infra/express/app';
import Logger from '../src/infra/winston/logger';
import conn, { connect } from '../src/infra/mongo/initializeMongo';
import * as request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import config from '../src/config/config';
import { Types } from 'mongoose';

let server: App;
let imageId: string | undefined;

jest.setTimeout(60000);

describe('Photo routes', () => {
    // "POST api/photos",
    // "GET api/photos/my",
    // "GET api/photos",
    // "GET api/photos/:photoId",
    // "PUT api/photos/:photoId",
    // "DELETE api/photos/:photoId",

    beforeAll(async () => {
        await connect(config.mongo.uri);

        const logger = new Logger();
        const auth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
            req['userId'] = new Types.ObjectId().toString();
            next();
        };

        const photoRepo = new PhotoRepo(conn, 'testPhoto', photoSchema);
        const photoService = new PhotoService(photoRepo, logger);
        const photoController = new PhotoController(photoService);
        const photoRouter = new PhotoRouter(photoController, auth);

        server = new App(3770, [photoRouter]);
    });

    afterAll(async () => {
        if (imageId) {
            await request(server.getApp()).delete(`/api/photos/${imageId}`);
        }

        await conn.dropCollection('testPhoto');

        await server.stop();
        conn.close();
    });

    test('POST /api/photos success with body', async () => {
        const image = Buffer.from('../uploads/photos/1705835372383-י שבט.jpeg');
        const response = await request(server.getApp()).post('/api/photos').attach('image', image, 'test.jpeg').field('description', 'description');

        expect(response.status).toBe(201);
        imageId = response.body._id;
    });

    test('GET /api/photos fail without query', async () => {
        const response = await request(server.getApp()).get('/api/photos');
        expect(response.status).toBe(400);
    });

    test('GET /api/photos success with query', async () => {
        const response = await request(server.getApp()).get('/api/photos?page=1&limit=1');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/photos/my fail without query', async () => {
        const response = await request(server.getApp()).get('/api/photos/my');
        expect(response.status).toBe(400);
    });

    test('GET /api/photos/my success with query', async () => {
        const response = await request(server.getApp()).get('/api/photos/my?page=1&limit=1');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/photos/:photoId fail wrong photoId', async () => {
        const mongoId = new Types.ObjectId().toString();
        const response = await request(server.getApp()).get('/api/photos/' + mongoId);
        expect(response.status).toBe(404);
    });

    test('GET /api/photos/:photoId success with photoId', async () => {
        const response = await request(server.getApp()).get('/api/photos/' + imageId);
        expect(response.status).toBe(200);
    });

    test('PUT /api/photos/:photoId fail without body', async () => {
        const response = await request(server.getApp()).put('/api/photos/' + imageId);
        expect(response.status).toBe(400);
    });

    test('PUT /api/photos/:photoId success with body', async () => {
        const response = await request(server.getApp())
            .put('/api/photos/' + imageId)
            .send({ description: 'new description' });
        expect(response.status).toBe(200);
    });

    test('DELETE /api/photos/:photoId fail wrong photoId', async () => {
        const mongoId = new Types.ObjectId().toString();
        const response = await request(server.getApp()).delete('/api/photos/' + mongoId);
        expect(response.status).toBe(404);
    });

    test('DELETE /api/photos/:photoId success with photoId', async () => {
        const response = await request(server.getApp()).delete('/api/photos/' + imageId);
        imageId = undefined;
        expect(response.status).toBe(200);
    });
});
