import * as express from 'express';
import { ICommentController } from '../controllers/commentController.interface';

import validateRequest from '../joi/joi';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import { createCommentSchema } from '../../../services/dtos/comment.schema';
import { commentSwagger } from './swagger/comment';
import { commentContent } from './swagger/content/comment.content';

class CommentRouter extends BaseRouter<ICommentController> {
    constructor(commentController: ICommentController, auth: express.RequestHandler) {
        super(commentController, auth, commentSwagger, commentContent);
        this.path = '/comments';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('/:photoId', wrapController(this.controller.getAllPhotoComments));
        this.router.post('/', validateRequest(createCommentSchema), wrapController(this.controller.createComment));
    }
}

export default CommentRouter;
