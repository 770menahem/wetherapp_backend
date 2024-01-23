import { BaseRepository } from './baseRepository';

import mongoose from 'mongoose';
import { IWeatherDal } from '../../../services/interfaces/dal/waetherDal.interface';
import { CityWeatherDetails } from '../../../types/weather.type';

export class WeatherRepo extends BaseRepository<CityWeatherDetails> implements IWeatherDal {
    constructor(conn: mongoose.Connection, collectionName: string, schema: mongoose.Schema) {
        super(conn, collectionName, schema);
    }

    create = async (weather: CityWeatherDetails): Promise<CityWeatherDetails> => {
        const newWeather = new this._model(weather);
        await newWeather.save();

        return newWeather;
    };

    getWeather = async (city: string): Promise<CityWeatherDetails | null> => {
        const foundedWeather = await this._model.findOne({ name: city, createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }).lean();

        return foundedWeather;
    };
}
