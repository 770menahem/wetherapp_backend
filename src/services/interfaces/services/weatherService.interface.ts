import { CityWeatherDetails } from '../../../types/weather.type';

export interface IWeatherService {
    getWeather(city: string): Promise<CityWeatherDetails>;
}
