import mongoose from 'mongoose';

export const photoSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        description: { type: String, required: false },
        path: { type: String, required: true },
        userId: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
