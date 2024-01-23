import mongoose from 'mongoose';

export const weatherSchema = new mongoose.Schema(
    {
        coord: { type: Object },
        weather: { type: Array },
        base: { type: String },
        name: { type: String, required: true, index: true },
        main: { type: Object },
        visibility: { type: Number },
        wind: { type: Object },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);
