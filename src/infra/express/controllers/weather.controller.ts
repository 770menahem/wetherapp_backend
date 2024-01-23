import { Request, Response } from 'express';

import { IWeatherController } from './weatherController.interface';
import { CityWeatherDetails } from '../../../types/weather.type';
import { NotFoundError } from '../utils/error';
import { IWeatherService } from '../../../services/interfaces/services/weatherService.interface';

export class WeatherController implements IWeatherController {
    private WeatherService: IWeatherService;

    constructor(WeatherService: IWeatherService) {
        console.log('WeatherController created');
        this.WeatherService = WeatherService;
    }

    getWeather = async (req: Request, res: Response) => {
        const city = req.params.city;
        const weather: CityWeatherDetails | null = await this.WeatherService.getWeather(city);
        if (!weather) throw new NotFoundError('Weather not found');
        else res.send(weather);
    };
}
