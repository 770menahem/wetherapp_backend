import * as express from 'express';

import validateRequest from '../joi/joi';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import { createPhotoSchema, photosByUserIdSchema, updatePhotoSchema } from '../../../services/dtos/photo.schema';
import { IPhotoController } from '../controllers/photoController.interface';
import { paginatedSchema } from '../../../services/dtos/global.schema';

class PhotoRouter extends BaseRouter<IPhotoController> {
    constructor(photoController: IPhotoController, auth: express.RequestHandler) {
        super(photoController, auth);
        this.path = '/photos';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);

        this.router.post('', validateRequest(createPhotoSchema), wrapController(this.controller.createPhoto));
        this.router.get('/user/:userId', validateRequest(photosByUserIdSchema), wrapController(this.controller.getPhotosByUserId));
        this.router.get('/', validateRequest(paginatedSchema), wrapController(this.controller.getAllPhotosPaginated));
        this.router.get('/:photoId', wrapController(this.controller.getPhotoById));
        this.router.put('/:photoId', validateRequest(updatePhotoSchema), wrapController(this.controller.updatePhotoById));
        this.router.delete('/:photoId', wrapController(this.controller.deletePhotoById));
    }
}

export default PhotoRouter;
