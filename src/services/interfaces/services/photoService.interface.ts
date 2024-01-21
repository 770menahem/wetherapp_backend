import { Pagination } from '../../../types/pagination';
import { createPhotoDTO } from '../../dtos/photo.schema';
import { Photo } from '../../../types/photo.type';

export interface IPhotoService {
    createPhoto(photo: createPhotoDTO): Promise<Photo>;
    getPhotosByUserId(userId: string, paginated: Pagination): Promise<Photo[]>;
    getAllPhotosPaginated(paginated: Pagination): Promise<Photo[]>;
    getPhotoById(photoId: string): Promise<Photo>;
    updatePhotoById(photoId: string, description: string): Promise<Photo>;
    deletePhotoById(photoId: string): Promise<Photo>;
}
