import mongoose from 'mongoose';

export const photoSchema = new mongoose.Schema(
    {
        description: { type: String, required: false },
        path: { type: String, required: true },
        photoName: { type: String, required: true },
        userId: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
