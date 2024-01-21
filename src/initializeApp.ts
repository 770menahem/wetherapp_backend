import config from './config/config';

import Logger from './infra/winston/logger';
import conn from './infra/mongo/initializeMongo';
import { userSchema } from './infra/mongo/models/user.model';

import { UserRepo } from './infra/mongo/repo/user.repo';
import Auth from './services/auth.service';
import { UserService } from './services/user.service';
import App from './infra/express/app';
import { UserController } from './infra/express/controllers/user.controller';
import UserRouter from './infra/express/routers/user.route';
import { PhotoRepo } from './infra/mongo/repo/photo.repo';
import { photoSchema } from './infra/mongo/models/photo.model';
import { PhotoService } from './services/photo.service';
import { PhotoController } from './infra/express/controllers/photo.controller';
import PhotoRouter from './infra/express/routers/photo.route';
import { CommentsRepo } from './infra/mongo/repo/comment.repo';
import { CommentService } from './services/comment.service';
import { CommentController } from './infra/express/controllers/comment.controller';
import CommentRouter from './infra/express/routers/comment.route';
import { commentSchema } from './infra/mongo/models/comment.model';

export function initializeApp(port: any) {
    const logger = new Logger();

    const userRepo = new UserRepo(conn, config.mongo.userCollectionName, userSchema);
    const userService = new UserService(userRepo, logger);
    const userController = new UserController(userService);
    const auth = new Auth(userService.auth);
    const userRouter = new UserRouter(userController, auth.check);

    const photoRepo = new PhotoRepo(conn, config.mongo.photoCollectionName, photoSchema);
    const photoService = new PhotoService(photoRepo, logger);
    const photoController = new PhotoController(photoService);
    const photoRouter = new PhotoRouter(photoController, auth.check);

    const commentRepo = new CommentsRepo(conn, config.mongo.commentCollectionName, commentSchema);
    const commentService = new CommentService(commentRepo, logger);
    const commentController = new CommentController(commentService);
    const commentRouter = new CommentRouter(commentController, auth.check);

    return new App(port, [userRouter, photoRouter, commentRouter]);
}
