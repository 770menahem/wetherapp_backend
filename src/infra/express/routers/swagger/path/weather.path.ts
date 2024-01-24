export const weatherSwagger = {
    '/weather/{city}': {
        get: {
            tags: ['Weather'],
            security: [
                {
                    JWT: [],
                },
            ],
            summary: 'Get weather by city name',
            description: 'Get weather by city name',
            parameters: [
                {
                    in: 'path',
                    name: 'city',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'City name',
                },
            ],
            responses: {
                200: {
                    description: 'Weather',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CityWeatherDetails',
                            },
                        },
                    },
                },
                404: {
                    description: 'Not found',
                },
            },
        },
    },
};
