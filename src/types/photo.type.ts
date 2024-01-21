export type Photo = {
    _id?: string;
    path: string;
    photoName: string;
    description: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};
