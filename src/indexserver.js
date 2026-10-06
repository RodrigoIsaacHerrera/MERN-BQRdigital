const express = require('express');
const morgan = require('morgan');
const path = require('path');
const connectDatabase = require('./database');
const ticketModel = require('./models/ticket');
const createBoletosRouter = require('./routes/boletosurl');

function createApp(options = {}) {
    const apiToken = options.apiToken === undefined
        ? process.env.API_TOKEN
        : options.apiToken;

    if (typeof apiToken !== 'string' || apiToken.trim().length === 0) {
        throw new Error('API_TOKEN is required to start the application.');
    }

    const app = express();
    const model = options.ticketModel || ticketModel;

    app.set('port', process.env.PORT || 1989);
    app.use(morgan('dev'));
    app.use(express.json({ limit: '10kb' }));
    app.use('/api/boletos', createBoletosRouter(model, apiToken));
    app.use(express.static(path.join(__dirname, 'public')));

    return app;
}

if (require.main === module) {
    const app = createApp();

    connectDatabase()
        .then(() => {
            app.listen(app.get('port'), () => {
                console.log(`MongoDB connected. Server listening on port ${app.get('port')}.`);
            });
        })
        .catch((error) => {
            console.error('Unable to connect to MongoDB:', error);
            process.exitCode = 1;
        });
}

module.exports = createApp;
