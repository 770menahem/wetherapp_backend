export const photoContent = {
    Photo: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                description: 'Photo id',
            },
            path: {
                type: 'string',
                description: 'Photo path',
            },
            photoName: {
                type: 'string',
                description: 'Photo name',
            },
            description: {
                type: 'string',
                description: 'Photo description',
            },
            userId: {
                type: 'string',
                description: 'User id',
            },
        },
    },
};
