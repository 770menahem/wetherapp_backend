import { CityWeatherDetails } from '../../../types/weather.type';

export interface IWeatherDal {
    getWeather(city: string): Promise<CityWeatherDetails | null>;
}
