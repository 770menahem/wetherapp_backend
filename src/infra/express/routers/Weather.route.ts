import * as express from 'express';
import { IWeatherController } from '../controllers/weatherController.interface';

import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';

class WeatherRouter extends BaseRouter<IWeatherController> {
    constructor(weatherController: IWeatherController, auth: express.RequestHandler) {
        super(weatherController, auth);
        this.path = '/weather';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('/:city', wrapController(this.controller.getWeather));
    }
}

export default WeatherRouter;
