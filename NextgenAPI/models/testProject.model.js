'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestProjectSchema = new Schema({
    ProjectName: {
        type: String,
        required: true
    },
    Regulator: {
        type: String,
        required: true
    },
    CreatedDTM: { type: Date, default: Date.now },
    IsActive: Boolean
},
    {
        collection: 'TestProjects',
        versionKey: false
    });

module.exports = mongoose.model('TestProjects', TestProjectSchema);
