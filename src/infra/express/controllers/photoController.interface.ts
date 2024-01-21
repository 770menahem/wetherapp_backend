import { Request, Response } from 'express';

export interface IPhotoController {
    createPhoto(req: Request, res: Response): Promise<void>;
    getPhotosByUserId(req: Request, res: Response): Promise<void>;
    getAllPhotosPaginated(req: Request, res: Response): Promise<void>;
    getPhotoById(req: Request, res: Response): Promise<void>;
    updatePhotoById(req: Request, res: Response): Promise<void>;
    deletePhotoById(req: Request, res: Response): Promise<void>;
}
