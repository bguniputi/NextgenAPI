'use strict';
const express = require('express');
const router = express.Router();
const testClasses = require("../controller/testClass.controller");

//Get all test classes
router.get('/', testClasses.findAll);

//Get testClass by name
router.get('/:TestClassName', testClasses.findByName);

//Get testClass by id
router.get('/Id/:id', testClasses.findById);

//Get testClasss by moduleId
router.get('/ModuleId/:moduleId', testClasses.findByModuleId);

//Get testClasss by moduleId by Id
router.get('/ModuleId/:moduleId/Id/:id', testClasses.findByModuleIdById);

//Create new test class
router.post('/', testClasses.CreateOne);

//Delete testClass by ObjectId
router.delete('/delete/:id', testClasses.delete);

//Update testClass by ObjectId
router.put('/update/:id', testClasses.UpdateOne);

module.exports = router;