import mongoose from 'mongoose';

export const tokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true, index: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
