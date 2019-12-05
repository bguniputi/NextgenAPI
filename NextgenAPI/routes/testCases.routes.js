'use strict';
const express = require('express');
const router = express.Router();
const testCases = require('../controller/testCase.controller');

//Get all testCases
router.get('/', testCases.findAll);

//Get testCase by name
router.get('/:testCaseName', testCases.findByName);

//Get testCase by id
router.get('/Id/:id', testCases.findById);

//Get testCases by classId
router.get('/ClassId/:classId', testCases.findByClassId);

//Get testCase by classId by Id
router.get('/ClassId/:classId/Id/:id', testCases.findByClassIdById);

//Create new testCase
router.post('/', testCases.CreateOne);

//Delete testCase by ObjectId
router.delete('/delete/:id', testCases.delete);

//Update testCase by ObjectId
router.put('/update/:id', testCases.UpdateOne);

module.exports = router;