'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TestClassSchema = new Schema({
    Module_id: {
        type: Schema.Types.ObjectId,
        required: true       
    },
    TestClassName:
    {
        type: String,
        required: true
    },
    Order:
    {
        type: Number,
        required: true
    },
    IsActive: Boolean
},
    {
        collection: 'TestClasses',
        versionKey: false
    });

module.exports = mongoose.model('TestClass', TestClassSchema);