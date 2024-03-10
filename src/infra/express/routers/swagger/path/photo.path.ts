export const photoSwagger = {
    '/photos': {
        post: {
            tags: ['Photos'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Create photo',
            description: 'Create photo',
            operationId: 'createPhoto',
            consumes: 'multipart/form-data',
            contentType: 'multipart/form-data',
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                image: {
                                    type: 'file',
                                    format: 'binary',
                                },
                                description: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Successful operation',
                    schema: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
                400: {
                    description: 'Invalid request',
                },
                401: {
                    description: 'Unauthorized',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
        get: {
            tags: ['Photos'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get all photos',
            description: 'Get all photos',
            operationId: 'getAllPhotos',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    description: 'Page number',
                    required: false,
                    type: 'number',
                },
                {
                    in: 'query',
                    name: 'limit',
                    description: 'Limit number',
                    required: false,
                    type: 'number',
                },
            ],
            responses: {
                200: {
                    description: 'Successful operation',
                    schema: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
                400: {
                    description: 'Invalid request',
                },
                401: {
                    description: 'Unauthorized',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
    '/photos/my': {
        get: {
            tags: ['Photos'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get all my photos',
            description: 'Get all my photos',
            operationId: 'getAllMyPhotos',
            produces: ['application/json'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    description: 'Page number',
                    required: false,
                    type: 'number',
                },
                {
                    in: 'query',
                    name: 'limit',
                    description: 'Limit number',
                    required: false,
                    type: 'number',
                },
            ],
            responses: {
                200: {
                    description: 'Successful operation',
                    schema: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
                400: {
                    description: 'Invalid request',
                },
                401: {
                    description: 'Unauthorized',
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    },
};
