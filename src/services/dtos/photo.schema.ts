import * as Joi from 'joi';

export type createPhotoDTO = {
    path: string;
    photoName: string;
    description: string;
    userId: string;
};

// export const createPhotoSchema = Joi.object({
//     files: Joi.array()
//         .items(
//             Joi.object({
//                 fieldname: 'image',
//             }).unknown(true),
//         )
//         .min(1)
//         .max(1)
//         .required(),
//     body: {
//         description: Joi.string().required(),
//     },
// });

export const updatePhotoSchema = Joi.object({
    body: {
        description: Joi.string().required(),
    },
});
