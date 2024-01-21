import Comment from '../../../types/comment.type';

export interface ICommentDal {
    getAllPhotoComments(photoId: string): Promise<Comment[]>;
    createComment(comment: Comment): Promise<Comment>;
}
