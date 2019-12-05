'use strict';
const express = require('express');
const router = express.Router();
const testData = require('../controller/testData.controller');

//Get all testData
router.get('/', testData.findAll);

//Get testData for the testCase
router.get('/TestCaseId/:testCaseId', testData.findByTestCaseId);

//Create new testData
router.post('/', testData.CreateOne);

//Delete testData by ObjectId
router.delete('/delete/:id', testData.delete);

//Update testData by ObjectId
router.put('/update/:id', testData.UpdateOne);

module.exports = router;
