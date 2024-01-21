import { commentSchema } from './../src/infra/mongo/models/comment.model';
import { CommentController } from './../src/infra/express/controllers/comment.controller';
import { CommentService } from './../src/services/comment.service';
import { CommentsRepo } from './../src/infra/mongo/repo/comment.repo';
import App from '../src/infra/express/app';
import Logger from '../src/infra/winston/logger';
import conn, { connect } from '../src/infra/mongo/initializeMongo';
import * as request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import config from '../src/config/config';
import { Types } from 'mongoose';
import CommentRouter from '../src/infra/express/routers/comment.route';

let server: App;
let imageId: string | undefined;

jest.setTimeout(60000);

describe('Photo routes', () => {
    //   "GET api/comments/:photoId",
    //   "POST api/comments"

    beforeAll(async () => {
        await connect(config.mongo.uri);

        const logger = new Logger();
        const auth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
            req['userId'] = new Types.ObjectId().toString();
            next();
        };

        const commentRepo = new CommentsRepo(conn, config.mongo.commentCollectionName, commentSchema);
        const commentService = new CommentService(commentRepo, logger);
        const commentController = new CommentController(commentService);
        const commentRouter = new CommentRouter(commentController, auth);

        // add mock photo
        const photo = await conn.collection('testPhoto').insertOne({
            description: 'description',
            path: 'path',
            userId: new Types.ObjectId().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        imageId = photo.insertedId.toString();

        server = new App(3770, [commentRouter]);
    });

    afterAll(async () => {
        await conn.dropCollection('testPhoto');

        await server.stop();
        conn.close();
    });

    it('should return 200', async () => {
        const res = await request(server.getApp()).get(`/api/comments/${imageId}`);

        expect(res.status).toBe(200);
    });

    it('should return 500', async () => {
        const res = await request(server.getApp()).get(`/api/comments/123`);

        expect(res.status).toBe(500);
    });

    it('should return 201', async () => {
        const res = await request(server.getApp()).post(`/api/comments`).send({
            photoId: imageId,
            comment: 'comment',
        });

        expect(res.status).toBe(201);
    });

    it('should return 400', async () => {
        const res = await request(server.getApp()).post(`/api/comments`).send({
            comment: 'comment',
        });

        expect(res.status).toBe(400);
    });
});
