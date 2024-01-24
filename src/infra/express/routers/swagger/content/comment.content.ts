export const commentContent = {
    Comment: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                description: 'Comment id',
            },
            comment: {
                type: 'string',
                description: 'Comment text',
            },
            photoId: {
                type: 'string',
                description: 'Photo id',
            },
            userId: {
                type: 'string',
                description: 'User id',
            },
        },
    },
};
