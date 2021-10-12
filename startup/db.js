const mongoose = require('mongoose');
const config = require('config');

module.exports = (debug) => {
    mongoose.connect(config.get('db_connectionString'), { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => {
        debug('MongoDB connection error');
        process.exit(1);
    });
    db.once('open', () => {
        debug('connected to db');
    });
}