export const userSwagger = {
    '/users': {
        post: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Create user',
            description: 'Create user',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
        get: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get all users',
            description: 'Get all users',
            responses: {
                200: {
                    description: 'Users',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },
    '/users/{userId}': {
        get: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get user by id',
            description: 'Get user by id',
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'User id',
                },
            ],
            responses: {
                200: {
                    description: 'User',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
        put: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Update user',
            description: 'Update user',
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'User id',
                },
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
        delete: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Delete user',
            description: 'Delete user',
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'User id',
                },
            ],
            responses: {
                200: {
                    description: 'User deleted',
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },
    '/users/login': {
        post: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Login',
            description: 'Login',

            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                name: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User logged in',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Login',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },
    '/users/refresh': {
        get: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Refresh token',
            description: 'Refresh token',
            responses: {
                200: {
                    description: 'Token refreshed',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Login',
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },
    '/users/logout': {
        get: {
            tags: ['Users'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Logout',
            description: 'Logout',
            responses: {
                200: {
                    description: 'User logged out',
                },
                400: {
                    description: 'Bad request',
                },
            },
        },
    },
};
