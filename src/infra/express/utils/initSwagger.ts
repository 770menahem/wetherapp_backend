import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as express from 'express';

export const initSwagger = (app: express.Application): void => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Web Advanced Application development 2023 REST API',
                version: '1.0.1',
                description: 'REST server including authentication using JWT and refresh token',
            },
            servers: [{ url: 'http://localhost:1770' }],
        },
        apis: ['./src/infra/express/routes/*.ts'],
    };

    const specs = swaggerJsDoc(options);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};
