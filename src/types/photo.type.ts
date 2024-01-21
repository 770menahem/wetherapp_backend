export type Photo = {
    _id?: string;
    photo: string; // base64
    description: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};
