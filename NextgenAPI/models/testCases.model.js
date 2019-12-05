'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var TestCasesSchema = new Schema({
    TestClass_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    TestCaseName: {
        type: String,
        required: true
    },
    TestCaseDescription: String,
    TestCaseType: {
        type: String,
        required: true
    },
    CreatedBy: String,
    CreatedDTM: {
        type: Date,
        default: Date.now
    },
    ModifiedBy: String,
    ModifiedDTM: {
        type: Date,
        default: Date.now
    },
    TestCasePriority: {
        type: String,
        required: true
    },
    TestCategory: {
        type: String,
        default: 'All'
    },
    Version: {
        type: String,
        default: '1.0'
    },
    DependentTestCase: String,
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
        collection: 'TestCases',
        versionKey: false
    });

module.exports = mongoose.model('TestCase', TestCasesSchema);