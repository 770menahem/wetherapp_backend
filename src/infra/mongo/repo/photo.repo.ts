import mongoose from 'mongoose';
import { IPhotoDal } from '../../../services/interfaces/dal/photoDal.interface';
import { Photo } from '../../../types/photo.type';
import { BaseRepository } from './baseRepository';
import { Pagination } from '../../../types/pagination';

export class PhotoRepo extends BaseRepository<Photo> implements IPhotoDal {
    private PhotoModel: mongoose.Model<Photo>;

    async updateDescription(PhotoId: string, description: string): Promise<Photo | null> {
        const updatedPhoto = await this.PhotoModel.findByIdAndUpdate(PhotoId, { description }, { new: true });

        return updatedPhoto;
    }

    async delete(PhotoId: string): Promise<Photo | null> {
        const deletedPhoto = await this.PhotoModel.findByIdAndDelete({ _id: PhotoId });

        return deletedPhoto;
    }

    async getById(PhotoId: string): Promise<Photo | null> {
        const Photo = await this.PhotoModel.findById(PhotoId);

        return Photo;
    }
    async getUsersPhotos(userId: string, pagination: Pagination): Promise<Photo[]> {
        const photos = await this.PhotoModel.find({ userId }, null, pagination);

        return photos;
    }
}
