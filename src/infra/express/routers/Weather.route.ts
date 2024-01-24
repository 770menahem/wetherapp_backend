import * as express from 'express';
import { IWeatherController } from '../controllers/weatherController.interface';
import { wrapController } from '../utils/wraps';
import { BaseRouter } from './baseRouter';
import * as apicache from 'apicache';
import { weatherSwagger } from './swagger/path/weather.path';
import { weatherContent } from './swagger/content/weather.content';

class WeatherRouter extends BaseRouter<IWeatherController> {
    constructor(weatherController: IWeatherController, auth: express.RequestHandler) {
        super(weatherController, auth, weatherSwagger, weatherContent);
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
