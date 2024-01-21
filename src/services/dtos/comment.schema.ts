import * as Joi from 'joi';

export type createCommentDTO = {
    _id?: string;
    comment: string;
    userId: string;
    photoId: string;
};

export const createCommentSchema = Joi.object({
    body: {
        comment: Joi.string().required(),
        photoId: Joi.string().required(),
    },
});
