import * as express from 'express';
import { IWeatherController } from '../controllers/weatherController.interface';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import * as apicache from 'apicache';
import { weatherSwagger } from './swagger/weather';

class WeatherRouter extends BaseRouter<IWeatherController> {
    constructor(weatherController: IWeatherController, auth: express.RequestHandler) {
        super(weatherController, auth, weatherSwagger);
        this.path = '/weather';
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        const cache = apicache.middleware;

        this.router.use(cache('1 day'));
        this.router.get('/:city', wrapController(this.controller.getWeather));
    }
}

export default WeatherRouter;
