'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var GlobalTestDataSchema = new Schema({
    Project_id: {
        type: Schema.Types.ObjectId
    },
    IsActive: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'GlobalTestData',
        versionKey: false,
        strict: false
    });

module.exports = mongoose.model('GlobalTestData', GlobalTestDataSchema);