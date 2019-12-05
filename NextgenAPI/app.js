'use strict'
const express = require('express');
const BodyParser = require('body-parser');
const app = express();
const db = require('./models/mongodb');
const logger = require('./config/logger');
const envConfig = require('./config/environment');
require('dotenv').config();

var morganLogger = require('morgan');

app.use(morganLogger('combined', { stream: logger.stream }));

const dbURL = `mongodb://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PASS)}@` +
    `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`;

const port = envConfig.port();
db.connect(dbURL, function (err) {
    if (err) {
        logger.error(err);
    }
    else {
        logger.info('connection to db successful');
    }
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(require('./routes/routes'));

app.listen(port, () => {
    logger.log('info','Running NextgenUI on port' + port);
});