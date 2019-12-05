'use strict';
const fs = require('fs');
const appRoot = require('app-root-path');
const envConfig = require('./environment');

const { createLogger, format, transports} = require('winston');
const { combine, timestamp,json } = format;

//Transports
const transportModes = {
    consoleLog: new transports.Console({
        format: format.simple()
    }),
    errorFile: new transports.File({
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        maxsize: 5242880,
        maxFiles:5,
        handleExceptions: true
    }),
    infoFile: new transports.File({
        level: 'info',
        filename: `${appRoot}/logs/info.log`,
        maxsize: 5242880,
        maxFiles: 5,
    })
};

const logger = createLogger({
    format: combine(
        format.align(),
        timestamp(),
        json()
    )
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    }
}

if (envConfig.environmentInfo() === 'production') {
    logger.add(transportModes.errorFile);
    if (envConfig.productionDebug() === 'true' && envConfig.productionDebug != null) {
        logger.add(transportModes.infoFile);
    }
}
else if (envConfig.environmentInfo() === 'development') {
    logger.add(transportModes.consoleLog);
}
module.exports = logger;
