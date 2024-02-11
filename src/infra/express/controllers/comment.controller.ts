import { Request, Response } from 'express';
import { ICommentService } from '../../../services/interfaces/services/commentService.interface';
import { ICommentController } from './commentController.interface';

export class CommentController implements ICommentController {
    private readonly commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    getAllPhotoComments = async (req: Request, res: Response): Promise<void> => {
        const { photoId } = req.params;

        const comments = await this.commentService.getAllPhotoComments(photoId);

        res.status(200).json(comments);
    };

    createComment = async (req: Request, res: Response): Promise<void> => {
        const { photoId } = req.params;
        const { comment } = req.body;

        const newComment = await this.commentService.createComment({ comment, photoId, userId: req.userId! });

        res.status(201).json(newComment);
    };
}
