import * as express from 'express';
import { createSchema, updateSchema, logoutSchema } from '../../../services/dtos/user.schema';
import { IUserController } from '../controllers/userController.interface';

import validateRequest from '../joi/joi';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import { userSwagger } from './swagger/path/user.path';
import { userContent } from './swagger/content/user.content';
import { uploadPhoto } from '../utils/multer.middleware';

class UserRouter extends BaseRouter<IUserController> {
    constructor(userController: IUserController, auth: express.RequestHandler) {
        super(userController, auth, userSwagger, userContent);
        this.path = '/users';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.post('/login', wrapController(this.controller.login));
        this.router.get('/refresh', wrapController(this.controller.refresh));
        this.router.post('', wrapController(uploadPhoto), validateRequest(createSchema), wrapController(this.controller.createUser));
        this.router.post('/logout', validateRequest(logoutSchema), wrapController(this.controller.logout));
        this.router.get('/image/:path', wrapController(this.controller.image));
        this.router.use(this.auth);
        this.router.get('', wrapController(this.controller.getAllUsers));
        this.router.get('/:userId', wrapController(this.controller.getUserById));
        this.router.put('/:userId', validateRequest(updateSchema), wrapController(this.controller.updateUser));
        this.router.delete('/:userId', wrapController(this.controller.deleteUser));
    }
}

export default UserRouter;
