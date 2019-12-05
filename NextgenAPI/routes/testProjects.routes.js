'use strict';
const express = require('express');
const router = express.Router();
const testProjects = require('../controller/testProject.controller.js');

//Get all test projects
router.get('/', testProjects.findAll);

//Get test project by name
router.get('/:ProjectName', testProjects.findByName);

//Get test project by id
router.get('/Id/:id', testProjects.findById);

//Create new test project
router.post('/', testProjects.CreateOne);

//Delete test project by ObjectId
router.delete('/delete/:id', testProjects.delete);

//Update test project by ObjectId
router.put('/update/:id', testProjects.UpdateOne);

module.exports = router;
