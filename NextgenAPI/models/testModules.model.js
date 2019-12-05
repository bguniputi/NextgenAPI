'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestModuleSchema = new Schema({
    ModuleType: {
        type: String,
        required: true
    },
    CreatedDTM:
    {
        type: Date,
        default: Date.now
    },
    ModifiedDTM:
    {
        type: Date,
        default: Date.now
    },
    IsActive: Boolean
},
    {
        collection: 'TestModules',
        versionKey: false
    });

module.exports = mongoose.model('TestModule', TestModuleSchema);