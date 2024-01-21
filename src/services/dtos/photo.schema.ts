import * as Joi from 'joi';

export type createPhotoDTO = {
    path: string;
    photoName: string;
    description: string;
    userId: string;
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
