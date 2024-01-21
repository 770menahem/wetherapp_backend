import { Request, Response } from 'express';

export interface ICommentController {
    getAllPhotoComments(req: Request, res: Response): Promise<void>;
    createComment(req: Request, res: Response): Promise<void>;
}
