'use strict';
const express = require('express');
const router = express.Router();
const testModules = require('../controller/testModule.controller');

//Get all test projects
router.get('/', testModules.findAll);

//Get test project by name
router.get('/:ModuleType', testModules.findByName);

//Get test project by id
router.get('/Id/:id', testModules.findById);

//Create new test project
router.post('/', testModules.CreateOne);

//Delete test project by ObjectId
router.delete('/delete/:id', testModules.delete);

//Update test project by ObjectId
router.put('/update/:id', testModules.UpdateOne);

module.exports = router;