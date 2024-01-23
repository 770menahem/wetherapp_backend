import * as swaggerUI from 'swagger-ui-express';
import * as express from 'express';

export const initSwagger = (app: express.Application, routers: object[]): void => {
    const swagger = {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:1770/api' }],
        components: {
            securitySchemes: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT token',
                },
            },
        },
        paths: routers.reduce((acc, router) => ({ ...acc, ...router }), {}),
    };

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));
};
