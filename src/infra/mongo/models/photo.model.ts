import mongoose, { Types } from 'mongoose';
import config from '../../../config/config';

export const photoSchema = new mongoose.Schema(
    {
        description: { type: String, required: false },
        path: { type: String, required: true },
        photoName: { type: String, required: true },
        userId: { type: Types.ObjectId, required: true, ref: config.mongo.userCollectionName },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
