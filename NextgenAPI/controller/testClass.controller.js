'use strict';
const TestClass = require('../models/testClasses.model');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../config/logger');

// Retrieve and return all classes from the database.
exports.findAll = (req, res) => {
    TestClass.find({})
        .then(testClasses => {
            res.send(testClasses);
        }).catch(err => {
            logger.error(err.message);
            res.status(500).send(err.message);
        });
};

// Find a single test class with a name
exports.findByName = (req, res) => {
    TestClass.findOne({ TestClassName: req.params.TestClassName })
        .then(testclass => {
            if (!testclass) {
                logger.error("Test Class not found with name" + `${req.params.TestClassName}`);
                return res.status(404).send({
                    message: "Test Class not found with name" + req.params.TestClassName
                });
            }
            else {
                return res.status(200).send(testclass);
            }
        }).catch(err => {
            if (err.kind === 'TestClassName') {
                logger.error("Test Class not found with name" + `${req.params.TestClassName}`);
                return res.status(404).send({
                    message: "Test Class not found with name" + req.params.TestClassName
                });
            }
            return res.status(500).send(err.message);
        });
};

//Find a testClass by id
exports.findById = (req, res) => {
    TestClass.findById({ _id: req.params.id })
        .then(testclass => {
            if (!testclass) {
                logger.error("Test Class not found by id" + `${req.params.id}`);
                res.status(404).send({
                    message: "Test Class not found by id" + req.params.id
                });
            }
            else {
                return res.status(200).send(testclass);
            }
        }).catch(err => {
            if (err.kind === "id") {
                logger.error("Test Class not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Test Class not found by id" + req.params.id
                });
            }
            return res.status(500).send(err.message);
        });
};

//Find testClass by module id
exports.findByModuleId = (req, res) => {
    TestClass.find({ Module_id: new ObjectId(req.params.moduleId)})
        .then(testclass => {
            if (!testclass) {
                logger.error("Test Classes not found by moduleId" + `${req.params.moduleId}`);
                res.status(404).send({
                    message: "Test Classes not found by moduleId " + req.params.moduleId
                });
            }
            else {
                return res.status(200).send(testclass);
            }
        }).catch(err => {
            if (err.kind === "moduleId") {
                logger.error("Test Classes not found by moduleId" + `${req.params.moduleId}`);
                return res.status(404).send({
                    message: "Test Classes not found by moduleId " + req.params.moduleId
                });
            }

            logger.error(err.message);
            return res.status(500).send(err.message);
        });
};

//Find testClass by moduleId and Id
exports.findByModuleIdById = (req, res) => {
    TestClass.find({ Module_id: new ObjectId(req.params.moduleId) }).find({ _id: req.params.id })
        .then(testclass => {
            if (!testclass) {
                logger.error("Test Classes not found by moduleId" + `${req.params.moduleId}`);
                return res.status(404).send({
                    message: "Test Class not found by moduleId" + req.params.moduleId
                });
            }
            else {
                return res.status(200).send(testclass);
            }
        }).catch(err => {
            if (err.kind === "moduleId" || err.kind === "id") {
                logger.error("Test Classes not found by moduleId" + `${req.params.moduleId}`);
                return res.status(404).send({
                    message: "Test Class not found by moduleId" + req.params.moduleId
                });
            }
            return res.status(500).send(err.message);
        });
};

//Delete testClass by id
exports.delete = (req, res) => {
    TestClass.findByIdAndRemove(req.params.id)
        .then(testclass => {
            if (!testclass) {
                logger.error("TestClass not found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestClass not found with given id" + req.params.id
                });
            }
            res.status(200).send({ message: "TestClass deleted successfully" });
        }).catch(err => {
            if (err.kind === 'id' || err.name === 'NotFound') {
                logger.error("TestClass not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestClass not found by id" + req.params.id
                });
            }
            res.status(500).send(err.message);
        });
};

//Create a new test class
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        logger.error("TestClass content cannot be empty");
        return res.status(400).send({ message: "TestClass content cannot be empty" });
    }
    const newTestClass = new TestClass({
        Module_id: req.body.Module_id,
        TestClassName: req.body.TestClassName,
        Order: req.body.Order,
        IsActive: (req.body.IsActive === null) ? false : req.body.IsActive
    });
    newTestClass.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Update the existing test Class
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        logger.error("TestClass content cannot be empty");
        return res.status(400).send({ message: "TestClass content cannot be empty" });
    }
    TestClass.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(testClass => {
            if (!testClass) {
                logger.error("No TestClass found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestClass found with given id " + req.params.id
                });
            }
            else {
                return res.status(200).send({
                    message: "TestClass is updated successfully"
                });
            }
        }).catch(err => {
            if (err.kind === 'id') {
                logger.error("No TestClass found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestClass found with given id " + req.params.id
                });
            }
            else {
                return res.status(404).send(err.message);
            }
        });
};