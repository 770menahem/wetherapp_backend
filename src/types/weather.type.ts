interface coord {
    lon: number;
    lat: number;
}

interface weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface wind {
    speed: number;
    deg: number;
}

export interface CityWeatherDetails {
    coord: coord;
    weather: weather[];
    base: string;
    name: string;
    main: main;
    visibility: number;
    wind: wind;
}
