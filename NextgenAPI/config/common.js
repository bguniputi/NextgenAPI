'use strict';

const fs = require('fs');

//Json Reader
exports.jsonReaderSync = (filePath) => {
    try {
        let jsonString = fs.readFileSync(filePath,'UTF-8');
        let data = JSON.parse(jsonString.trim());
        return data;
    } catch (err) {
        return err;
    }

};

exports.getRouteFiles = (app) => {
    fs.readdirSync('../routes').forEach((file) => {
        if (file.substr(file.lastIndexOf('.') + 1) !== '.js') {
            return
        }
        else {
            let name = file.substr(0, file.indexOf('.'));
            require('./' + name)(app);
        }
    });
};