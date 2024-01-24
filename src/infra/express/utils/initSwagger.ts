import * as swaggerUI from 'swagger-ui-express';
import * as express from 'express';
import { SwaggerConfig } from '../routers/swagger/swaggerConfig.type';

export const initSwagger = (app: express.Application, swaggerConfig: SwaggerConfig): void => {
    const swagger = {
        openapi: '3.0.0',
        info: {
            title: 'Weather app',
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
            schemas: {
                ...swaggerConfig.schemas.reduce((acc, content) => ({ ...acc, ...(content ?? {}) }), {}),
            },
        },
        paths: swaggerConfig.paths.reduce((acc, router) => ({ ...acc, ...router }), {}),
    };

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));
};
