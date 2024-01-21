import * as Joi from 'joi';
import { paginatedSchema } from './global.schema';

export type createPhotoDTO = {
    photo: string; // base64
    description: string;
};

export const createPhotoSchema = Joi.object({
    body: {
        photo: Joi.string().required(),
        description: Joi.string().required(),
    },
});

export const updatePhotoSchema = Joi.object({
    body: {
        description: Joi.string().required(),
    },
});

export const photosByUserIdSchema = Joi.object({
    params: {
        userId: Joi.string().required(),
    },
}).concat(paginatedSchema);
