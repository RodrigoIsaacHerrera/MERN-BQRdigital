const mongoose = require('mongoose');

const DEFAULT_DATABASE_URI = 'mongodb://127.0.0.1:27017/BQRdigital';

function connectDatabase(uri = process.env.MONGODB_URI || DEFAULT_DATABASE_URI) {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = connectDatabase;
