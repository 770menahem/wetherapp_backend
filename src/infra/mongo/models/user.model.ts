import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true, select: true },
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
        imagePath: { type: String, required: false },
        fullPath: { type: String, required: false },
    },
    { versionKey: false },
);

// export const userModel = mongoose.model<User>(config.mongo.userCollectionName, userSchema);
