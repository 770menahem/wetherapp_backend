export const weatherContent = {
    weather: {
        type: 'object',
        properties: {
            coord: {
                type: 'object',
                properties: {
                    lon: {
                        type: 'number',
                        description: 'Longitude',
                    },
                    lat: {
                        type: 'number',
                        description: 'Latitude',
                    },
                },
            },
            weather: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            description: 'Weather id',
                        },
                        main: {
                            type: 'string',
                            description: 'Weather main',
                        },
                        description: {
                            type: 'string',
                            description: 'Weather description',
                        },
                        icon: {
                            type: 'string',
                            description: 'Weather icon',
                        },
                    },
                },
            },
            base: {
                type: 'string',
                description: 'Base',
            },
            name: {
                type: 'string',
                description: 'City name',
            },
            main: {
                type: 'object',
                properties: {
                    temp: {
                        type: 'number',
                        description: 'Temperature',
                    },
                    feels_like: {
                        type: 'number',
                        description: 'Feels like',
                    },
                    temp_min: {
                        type: 'number',
                        description: 'Minimum temperature',
                    },
                    temp_max: {
                        type: 'number',
                        description: 'Maximum temperature',
                    },
                    pressure: {
                        type: 'number',
                        description: 'Pressure',
                    },
                    humidity: {
                        type: 'number',
                        description: 'Humidity',
                    },
                },
            },
            visibility: {
                type: 'number',
                description: 'Visibility',
            },
            wind: {
                type: 'object',
                properties: {
                    speed: {
                        type: 'number',
                        description: 'Wind speed',
                    },
                    deg: {
                        type: 'number',
                        description: 'Wind deg',
                    },
                },
            },
        },
    },
};
