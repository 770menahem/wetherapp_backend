import * as express from 'express';
// import  BaseController  from "./basecontroller";

export abstract class BaseRouter<T> {
    public path;
    protected _router = express.Router();
    protected controller: T;
    public auth: express.RequestHandler;
    public swaggerPaths: any;
    public swaggerContent: any;

    constructor(controller: T, auth: express.RequestHandler, swaggerPaths: any, swaggerContent?: any) {
        this.controller = controller;
        this.auth = auth;
        this.initializeRoutes();
        this.swaggerPaths = swaggerPaths;
        this.swaggerContent = swaggerContent;
    }

    get router() {
        return this._router;
    }

    public abstract initializeRoutes(): void;
}
