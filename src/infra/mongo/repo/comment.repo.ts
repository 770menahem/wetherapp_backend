import Comment from '../../../types/comment.type';
import { BaseRepository } from './baseRepository';

export class CommentsRepo extends BaseRepository<Comment> {
    async getAllPhotoComments(photoId: string) {
        return await this._model.find({ photoId });
    }

    async createComment(comment: Comment) {
        return await this._model.create(comment);
    }
}
