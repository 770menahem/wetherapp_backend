import { CityWeatherDetails } from '../../../types/weather.type';

export interface IWeatherGetDal {
    getWeather(city: string): Promise<CityWeatherDetails | null>;
}

export interface IWeatherCreateDal {
    create(weather: CityWeatherDetails): Promise<CityWeatherDetails>;
}

export interface IWeatherDal extends IWeatherGetDal, IWeatherCreateDal {}
