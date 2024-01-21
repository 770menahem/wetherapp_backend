export type Photo = {
    _id?: string;
    photo: string; // base64
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
};
