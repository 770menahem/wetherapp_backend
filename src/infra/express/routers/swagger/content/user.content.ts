export const userContent = {
    User: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                example: '5f4e3f3f3f3f3f3f3f3f3f3f',
            },
            name: {
                type: 'string',
                example: 'John Doe',
            },
            password: {
                type: 'string',
                example: '123456',
            },
            imagePath: {
                type: 'string',
                example: 'https://www.google.com/image.png',
            },
            fullPath: {
                type: 'string',
                example: 'https://www.google.com/image.png',
            },
            createdAt: {
                type: 'string',
                example: '2020-09-01T00:00:00.000Z',
            },
            updatedAt: {
                type: 'string',
                example: '2020-09-01T00:00:00.000Z',
            },
        },
    },
    CreateUser: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                example: 'John Doe',
            },
            password: {
                type: 'string',
                example: '123456',
            },
            image: {
                type: 'string',
                example: 'https://www.google.com/image.png',
            },
        },
    },
};
