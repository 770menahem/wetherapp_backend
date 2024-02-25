import { NotFoundError } from '../infra/express/utils/error';
import { ILogger } from '../log/logger';
import { CityWeatherDetails } from '../types/weather.type';
import { IWeatherDal } from './interfaces/dal/waetherDal.interface';
import { IWeatherService } from './interfaces/services/weatherService.interface';

export class WeatherService implements IWeatherService {
    private weatherApi: IWeatherDal;
    private _logger: ILogger;

    constructor(weatherApi: IWeatherDal, logger: ILogger) {
        this.weatherApi = weatherApi;
        this._logger = logger;
    }

    getWeather = async (city: string): Promise<CityWeatherDetails> => {
        const weather = await this.weatherApi.getWeather(city);

        if (!weather) {
            this._logger.logError({ message: `Weather not found: ${city} in api` });
            throw new NotFoundError(`Weather not found: ${city}`);
        }

        this._logger.logInfo({ message: `Weather found: ${weather.name}` });

        return weather;
    };
}
