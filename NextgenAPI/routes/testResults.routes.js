'use strict';
const express = require('express');
const router = express.Router();
const testResults = require('../controller/testResult.controller');

//Get all test results
router.get('/', testResults.findAll);

//Get test results by test cycle name
router.get('/:TestCycleName?', testResults.findByCycleName);

//Create new test result
router.post('/', testResults.CreateOne);

//Delete test results by test cycle name
router.delete('/delete/:TestCycleName', testResults.DeleteByTestCycleName);

module.exports = router;