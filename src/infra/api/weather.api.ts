import axios, { AxiosInstance } from 'axios';
import { IWeatherGetDal } from '../../services/interfaces/dal/waetherDal.interface';

export class WeatherApi implements IWeatherGetDal {
    protected _axiosInstance: AxiosInstance;
    private apikKey: string;

    constructor(baseUrl: string, apikKey: string) {
        this._axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 15000000,
        });

        this.apikKey = apikKey;
    }

    getWeather = async (city: string): Promise<any> => {
        const weather = await this._axiosInstance.get(`weather?q=${city}&units=metric&apikey=${this.apikKey}`);
        return weather.data;
    };
}
