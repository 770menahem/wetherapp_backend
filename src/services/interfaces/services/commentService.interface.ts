import Comment from '../../../types/comment.type';

export interface ICommentService {
    getAllPhotoComments(photoId: string): Promise<Comment[]>;
    createComment(comment: Comment): Promise<Comment>;
}
