import { IPhotoService } from './interfaces/services/photoService.interface';
import { ILogger } from '../log/logger';
import { IPhotoDal } from './interfaces/dal/photoDal.interface';
import { Pagination } from '../types/pagination';
import { Photo } from '../types/photo.type';
import { createPhotoDTO } from './dtos/photo.schema';
import { NotFoundError } from '../infra/express/utils/error';

export class PhotoService implements IPhotoService {
    private PhotoRepo: IPhotoDal;
    private _logger: ILogger;

    constructor(PhotoRepo: IPhotoDal, logger: ILogger) {
        this.PhotoRepo = PhotoRepo;
        this._logger = logger;
    }
    async createPhoto(photo: createPhotoDTO): Promise<Photo> {
        const newPhoto = await this.PhotoRepo.create(photo);

        this._logger.logInfo({ message: `Photo created: ${newPhoto._id}` });

        return newPhoto;
    }
    async getPhotosByUserId(userId: string, paginated: Pagination): Promise<Photo[]> {
        const photos = await this.PhotoRepo.getUsersPhotos(userId, paginated);

        if (!photos) {
            this._logger.logWarn({ message: `No photos found for user: ${userId}` });
            throw new NotFoundError(`No photos found for user: ${userId}`);
        }

        this._logger.logInfo({ message: `Photos retrieved for user: ${userId}`, extraFields: { photosCount: photos?.length } });

        return photos;
    }

    async getAllPhotosPaginated(paginated: Pagination): Promise<Photo[]> {
        const photos = await this.PhotoRepo.getAll(paginated);

        this._logger.logInfo({ message: `Photos retrieved`, extraFields: { photosCount: photos?.length } });

        return photos;
    }

    async getPhotoById(photoId: string): Promise<Photo> {
        const photo = await this.PhotoRepo.getById(photoId);

        if (!photo) {
            this._logger.logError({ message: `Photo not found: ${photoId}` });
            throw new NotFoundError(`Photo not found: ${photoId}`);
        }

        this._logger.logInfo({ message: `Photo retrieved: ${photoId}` });

        return photo;
    }
    async updatePhotoById(photoId: string, description: string): Promise<Photo> {
        const updatedPhoto = await this.PhotoRepo.updateDescription(photoId, description);

        if (!updatedPhoto) {
            this._logger.logError({ message: `Photo not found: ${photoId}` });
            throw new NotFoundError(`Photo not found: ${photoId}`);
        }

        this._logger.logInfo({ message: `Photo updated: ${photoId}` });

        return updatedPhoto;
    }

    async deletePhotoById(photoId: string): Promise<Photo> {
        const deletedPhoto = await this.PhotoRepo.delete(photoId);

        if (!deletedPhoto) {
            this._logger.logError({ message: `Photo not found: ${photoId}` });
            throw new NotFoundError(`Photo not found: ${photoId}`);
        }

        this._logger.logInfo({ message: `Photo deleted: ${photoId}` });

        return deletedPhoto;
    }
}