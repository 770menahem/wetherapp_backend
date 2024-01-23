import { NotFoundError } from '../infra/express/utils/error';
import { ILogger } from '../log/logger';
import { CityWeatherDetails } from '../types/weather.type';
import { IWeatherDal, IWeatherGetDal } from './interfaces/dal/waetherDal.interface';
import { IWeatherService } from './interfaces/services/weatherService.interface';

export class WeatherService implements IWeatherService {
    private weatherRepo: IWeatherDal;
    private weatherApi: IWeatherGetDal;
    private _logger: ILogger;

    constructor(weatherRepo: IWeatherDal, weatherApi: IWeatherGetDal, logger: ILogger) {
        this.weatherRepo = weatherRepo;
        this.weatherApi = weatherApi;
        this._logger = logger;
    }

    getWeather = async (city: string): Promise<CityWeatherDetails> => {
        let weather = await this.weatherRepo.getWeather(city);

        if (!weather) {
            this._logger.logInfo({ message: `Weather not found: ${city} in db` });

            weather = await this.weatherApi.getWeather(city);

            if (!weather) {
                this._logger.logError({ message: `Weather not found: ${city} in api` });
                throw new NotFoundError(`Weather not found: ${city}`);
            } else {
                this._logger.logInfo({ message: `Weather retrieved: ${city} from api, saving to db` });
                await this.weatherRepo.create(weather);
            }
        }

        this._logger.logInfo({ message: `Weather found: ${weather}` });

        return weather;
    };
}
