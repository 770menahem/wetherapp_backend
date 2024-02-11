type Comment = {
    _id?: string;
    comment: string;
    photoId: string;
    userId: string;
};

export type PopulateComment = {
    _id: string;
    comment: string;
    photoId: string;
    userId: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
};

export default Comment;
