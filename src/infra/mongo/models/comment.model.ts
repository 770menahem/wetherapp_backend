import mongoose from 'mongoose';
import config from '../../../config/config';

export const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: false },
        photoId: { type: String, required: true, ref: config.mongo.photoCollectionName },
        userId: { type: String, required: true, ref: config.mongo.userCollectionName },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
