import mongoose, { Types } from 'mongoose';
import config from '../../../config/config';

export const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: false },
        photoId: { type: Types.ObjectId, required: true, ref: config.mongo.photoCollectionName },
        userId: { type: String, required: true, ref: config.mongo.userCollectionName },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
