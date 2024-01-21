import { Pagination } from '../../../types/pagination';
import { Photo } from '../../../types/photo.type';

export interface IPhotoDal {
    create(Photo: Photo): Promise<Photo>;
    updateDescription(photoId: string, description: string, userId: string): Promise<Photo | null>;
    delete(photoId: string): Promise<Photo | null>;
    getById(photoId: string): Promise<Photo | null>;
    getPhotos(pagination: Pagination): Promise<Photo[]>;
    getUsersPhotos(userId: string, pagination: Pagination): Promise<Photo[]>;
}
