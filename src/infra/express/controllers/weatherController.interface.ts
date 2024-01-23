import { Request, Response } from 'express';

export interface IWeatherController {
    getWeather(req: Request, res: Response): Promise<void>;
}
