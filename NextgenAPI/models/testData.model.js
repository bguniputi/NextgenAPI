'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestDataSchema = new Schema({
    TestCase_Id: {
        type: Schema.Types.ObjectId
    },
    Order: {
        type: Number,
        default: 0
    },
    IsActive: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'TestData',
        versionKey: false,
        strict: false
    });

module.exports = mongoose.model('TestData', TestDataSchema);