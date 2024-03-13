import * as Joi from 'joi';

export type createUserDTO = {
    name: string;
    password: string;
};

export const createSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        password: Joi.string().required(),
        photo: Joi.string().required(),
        photoName: Joi.string().required(),
    },
});

export const createGoogleSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        password: Joi.string().required(),
        fullPath: Joi.string().required(),
    },
});

export const updateSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
});

export const logoutSchema = Joi.object({
    headers: Joi.object({
        refreshtoken: Joi.string().required(),
    }).unknown(),
});
