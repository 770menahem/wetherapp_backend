import * as Joi from 'joi';

export const paginatedSchema = Joi.object({
    query: {
        page: Joi.number().required(),
        limit: Joi.number().required(),
    },
});
