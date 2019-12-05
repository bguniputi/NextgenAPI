'use strict';
const express = require('express');
const router = express.Router();
const globalTestData = require('../controller/testGlobalData.controller');

//Get all global testData
router.get('/', globalTestData.findAll);

//Get global testData for the testCase
router.get('/ProjectId/:projectId', globalTestData.findByProjectId);

//Create new global testData
router.post('/', globalTestData.CreateOne);

//Delete global testData by project id
router.delete('/delete/:projectId', globalTestData.delete);

//Update global testData by project id
router.put('/update/:projectId', globalTestData.UpdateOne);

module.exports = router;