export const commentSwagger = {
    '/comments/{photoId}': {
        get: {
            tags: ['Comments'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get all comments of a photo',
            description: 'Get all comments of a photo',
            operationId: 'getComments',
            parameters: [
                {
                    name: 'photoId',
                    in: 'path',
                    description: 'Photo ID',
                    required: true,
                    type: 'string',
                },
            ],
            responses: {
                '200': {
                    description: 'Comments',
                    schema: {
                        type: 'array',
                    },
                },
                '401': {
                    description: 'Unauthorized',
                },
                '404': {
                    description: 'Photo not found',
                },
            },
        },
        post: {
            tags: ['Comments'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Create a comment',
            description: 'Create a comment',
            operationId: 'createComment',
            parameters: [
                {
                    name: 'photoId',
                    in: 'path',
                    description: 'Photo ID',
                    required: true,
                    type: 'string',
                },
                {
                    name: 'body',
                    in: 'body',
                    description: 'Comment object',
                    required: true,
                },
            ],
            responses: {
                '200': {
                    description: 'Comment created',
                },
                '400': {
                    description: 'Bad request',
                },
                '401': {
                    description: 'Unauthorized',
                },
                '404': {
                    description: 'Photo not found',
                },
            },
        },
    },
};
