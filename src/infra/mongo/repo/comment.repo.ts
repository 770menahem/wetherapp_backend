import { Types } from 'mongoose';
import { ICommentDal } from '../../../services/interfaces/dal/commentDal.interface';
import Comment from '../../../types/comment.type';
import { BaseRepository } from './baseRepository';

export class CommentsRepo extends BaseRepository<Comment> implements ICommentDal {
    getAllPhotoComments = async (photoId: string) => {
        return await this._model.find({ photoId }).populate('userId').lean();
    };

    createComment = async (comment: Comment) => {
        return await this._model.create({
            ...comment,
            photoId: new Types.ObjectId(comment.photoId),
        });
    };
}
