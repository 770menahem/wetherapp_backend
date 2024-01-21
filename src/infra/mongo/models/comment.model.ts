import mongoose from 'mongoose';

export const commentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: false },
        photoId: { type: String, required: true },
        userId: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
