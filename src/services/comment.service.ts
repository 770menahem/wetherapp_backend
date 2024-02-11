import { ILogger } from '../log/logger';
import Comment, { PopulateComment } from '../types/comment.type';
import { ICommentDal } from './interfaces/dal/commentDal.interface';
import { ICommentService } from './interfaces/services/commentService.interface';

export class CommentService implements ICommentService {
    private commentRepo: ICommentDal;
    private logger: ILogger;

    constructor(commentRepo: ICommentDal, logger: ILogger) {
        this.commentRepo = commentRepo;
        this.logger = logger;
    }

    getAllPhotoComments = async (photoId: string): Promise<Comment[]> => {
        const comments = await this.commentRepo.getAllPhotoComments(photoId);

        this.logger.logInfo({ message: `Comments retrieved for photo: ${photoId}`, extraFields: { commentsCount: comments?.length } });

        return comments.map((comment: any) => ({
            _id: comment._id,
            comment: comment.comment,
            photoId: comment.photoId,
            userId: comment.userId._id,
            userName: comment.userId.name,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
        })) as PopulateComment[];
    };

    createComment = async (comment: Comment): Promise<Comment> => {
        const newComment = await this.commentRepo.createComment(comment);

        this.logger.logInfo({ message: `Comment created: ${newComment._id}` });

        return newComment;
    };
}
