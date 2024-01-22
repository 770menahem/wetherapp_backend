import config from './config/config';
import { initializeApp } from './initializeApp';
import { connect } from './infra/mongo/initializeMongo';
import * as https from 'https';
// import * as http from 'http';
import * as fs from 'fs';
const { mongo } = config;

/**
 * The main function.
 * Calls all the initialization functions.
 */
const main = async () => {
    await connect(mongo.uri);

    const port = config.server.port || 2770;

    const app = initializeApp(port);

    console.log('ENV: ' + process.env.NODE_ENV);

    if (process.env.NODE_ENV !== 'production') {
        app.start();
        // http.createServer(app.getApp).listen(config.server.port);
        // console.log(`Server running on port ${config.server.port}`);
    } else {
        const options2 = {
            key: fs.readFileSync(__dirname + '/../key.pem'),
            cert: fs.readFileSync(__dirname + '/../cert.pem'),
        };
        https.createServer(options2, app.getApp).listen(config.server.https_port);
        console.log(`Server running on port ${config.server.https_port}`);
    }
};

main().catch((err) => {
    console.log(err);
    process.exit();
});
