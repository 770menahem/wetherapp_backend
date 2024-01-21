import { Pagination } from '../../../types/pagination';
import { Photo } from '../../../types/photo.type';

export interface IPhotoDal {
    create(Photo: Photo): Promise<Photo>;
    updateDescription(PhotoId: string, description: string): Promise<Photo | null>;
    delete(PhotoId: string): Promise<Photo | null>;
    getById(PhotoId: string): Promise<Photo | null>;
    getAll(pagination: Pagination): Promise<Photo[]>;
    getUsersPhotos(userId: string, pagination: Pagination): Promise<Photo[]>;
}
