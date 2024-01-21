import { Request, Response } from 'express';
import { IPhotoController } from './photoController.interface';
import { IPhotoService } from '../../../services/interfaces/services/photoService.interface';

export class PhotoController implements IPhotoController {
    private PhotoService: IPhotoService;

    constructor(PhotoService: IPhotoService) {
        console.log('PhotoController created');
        this.PhotoService = PhotoService;
    }

    createPhoto = async (req: Request, res: Response): Promise<void> => {
        const userId = req.userId!;
        const { photo, description } = req.body;

        const newPhoto = await this.PhotoService.createPhoto({ photo, description, userId });
        res.status(201).json(newPhoto);
    };

    getPhotosByUserId = async (req: Request, res: Response): Promise<void> => {
        const userId = req.userId!;
        const page: number = +req.query.page!;
        const limit: number = +req.query.limit!;

        const photos = await this.PhotoService.getPhotosByUserId(userId, { page, limit });
        res.status(200).json(photos);
    };
    getAllPhotosPaginated = async (req: Request, res: Response): Promise<void> => {
        const page: number = +req.query.page!;
        const limit: number = +req.query.limit!;

        const photos = await this.PhotoService.getAllPhotosPaginated({ page, limit });
        res.status(200).json(photos);
    };
    getPhotoById = async (req: Request, res: Response): Promise<void> => {
        const { photoId } = req.params;

        const photo = await this.PhotoService.getPhotoById(photoId);
        res.status(200).json(photo);
    };
    updatePhotoById = async (req: Request, res: Response): Promise<void> => {
        const { photoId } = req.params;
        const { description } = req.body;

        const updatedPhoto = await this.PhotoService.updatePhotoById(photoId, description);
        res.status(200).json(updatedPhoto);
    };
    deletePhotoById = async (req: Request, res: Response): Promise<void> => {
        const { photoId } = req.params;

        const deletedPhoto = await this.PhotoService.deletePhotoById(photoId);
        res.status(200).json(deletedPhoto);
    };
}
