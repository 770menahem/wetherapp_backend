import { IPhotoDal } from '../../../services/interfaces/dal/photoDal.interface';
import { Photo } from '../../../types/photo.type';
import { BaseRepository } from './baseRepository';
import { Pagination } from '../../../types/pagination';
import mongoose from 'mongoose';

export class PhotoRepo extends BaseRepository<Photo> implements IPhotoDal {
    constructor(conn: mongoose.Connection, collectionName: string, schema: mongoose.Schema) {
        super(conn, collectionName, schema);
    }

    getPhotos = async (pagination: Pagination): Promise<Photo[]> => {
        const photos = await this._model
            .aggregate([
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'photoId',
                        as: 'comments',
                    },
                },
                {
                    $addFields: {
                        commentCount: { $size: '$comments' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $addFields: {
                        user: { $arrayElemAt: ['$user', 0] },
                    },
                },
                {
                    $project: {
                        comments: 0,
                        userId: 0,
                    },
                },
            ])
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit);

        return photos;
    };

    updateDescription = async (photoId: string, description: string, userId: string): Promise<Photo | null> => {
        const updatedPhoto = await this._model
            .findByIdAndUpdate(
                {
                    _id: photoId,
                    userId,
                },
                { description },
                { new: true },
            )
            .lean();

        return updatedPhoto;
    };

    delete = async (PhotoId: string): Promise<Photo | null> => {
        const deletedPhoto = await this._model.findByIdAndDelete({ _id: PhotoId }).lean();

        return deletedPhoto;
    };

    getById = async (PhotoId: string): Promise<Photo | null> => {
        const Photo = await this._model.findById(PhotoId).lean();

        return Photo;
    };

    getUsersPhotos = async (userId: string, pagination: Pagination): Promise<Photo[]> => {
        const photos = await this._model
            .aggregate([
                {
                    $match: {
                        userId: userId,
                    },
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'photoId',
                        as: 'comments',
                    },
                },
                {
                    $addFields: {
                        commentCount: { $size: '$comments' },
                    },
                },
                {
                    $project: {
                        comments: 0, // exclude comments array from output
                    },
                },
            ])
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit);

        return photos;
    };
}
