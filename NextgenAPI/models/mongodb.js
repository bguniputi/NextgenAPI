'use strict';
const mongoose = require('mongoose');
const logger = require('../config/logger');
require('dotenv').config();

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
};

const state = {
    db: null
};

exports.connect = (url, done) => {
    if (state.db) {
        return done;
    }

    mongoose.connect(url, options, (err, db) => {
        if (err) {
            logger.error(err);
            return done(err);
        }
        state.db = db;
        done();
    });
};

exports.get = () => {
    return state.db;
};

exports.close = (done) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            logger.error(err);
            done(err);
        });
    }
};