'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestResultSchema = new Schema({
    TestCase_Id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    TestCycle: {
        type: String,
        default: null
    },
    Result: {
        type: String,
        required: true,
        default: 'InConClusive'
    },
    ExecutedDTM: { type: Date },
    ResultSets: {
        type: Array,
        required: true
    }
},
    {
        collection: 'TestResults',
        versionKey: false
    });

module.exports = mongoose.model('TestResult', TestResultSchema);