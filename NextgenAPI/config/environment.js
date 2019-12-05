'use strict';
require('dotenv').config();

function environmentInfo() {
    var envInfo = process.env.NODE_ENV;
    return envInfo;
};

function productionDebug(){
    var isDebug = process.env.NODE_DEBUG;
    return isDebug;
};

function port(){
    var portNumber = process.env.NODE_PORT || 8080;
    return portNumber;
};

module.exports = {
    environmentInfo: environmentInfo,
    productionDebug: productionDebug,
    port: port
};
