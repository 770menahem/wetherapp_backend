import * as env from 'env-var';
import './dotenv';

const config = {
    server: {
        port: env.get('PORT').required().asPortNumber(),
        https_port: env.get('HTTPS_PORT').required().asPortNumber(),
        needAuth: env.get('NEED_AUTH').default('true').required().asBool(),
        tokenExpiration: env.get('TOKEN_EXPIRATION').default('1h').required().asString(),
    },
    weatherApi: {
        baseUrl: env.get('WEATHER_API_BASE_URL').required().asString(),
        weatherApiKey: env.get('WEATHER_API_KEY').required().asString(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        uriTest: env.get('MONGO_TEST_URI').required().asString(),
        photoCollectionName: env.get('PHOTO_COLLECTION_NAME').required().asString(),
        userCollectionName: env.get('USER_COLLECTION_NAME').required().asString(),
        commentCollectionName: env.get('COMMENT_COLLECTION_NAME').required().asString(),
        tokenCollectionName: env.get('TOKEN_COLLECTION_NAME').required().asString(),
    },
    keys: {
        initializationVector: env.get('VECTOR').example('length of 16 456').required().asString(),
        secretKey: env.get('SECRET_KEY').example('length of 36 45678901234567890123456').required().asString(),
        tokenKey: env.get('TOKEN_KEY').required().asString(),
    },
};

export default config;
