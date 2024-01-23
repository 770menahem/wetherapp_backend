import { Router } from 'express';

interface IRouter {
    path: string;
    router: Router;
    initializeRoutes(): void;
    swaggerPaths: any;
}

export default IRouter;
