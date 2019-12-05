'use strict';
const TestCase = require('../models/testCases.model');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../config/logger');

// Retrieve and return all testcases from the database.
exports.findAll = (req, res) => {
    TestCase.find({})
        .then(testcases => {
            res.status(200).send(testcases);
        }).catch(err => {
            logger.error(err.message);
            res.status(500).send(err.message);
        });
};

// Find a single test case with a name
exports.findByName = (req, res) => {
    TestCase.findOne({ TestCaseName: req.params.testCaseName })
        .then(testCase => {
            if (!testCase) {
                logger.error("TestCase not found with name" + `${req.params.testCaseName}`);
                return res.status(404).send({
                    message: "TestCase not found with name " + req.params.testCaseName
                });
            }
            else {
                return res.status(200).send(testCase);
            }
        }).catch(err => {
            if (err.kind === 'testCaseName') {
                logger.error("TestCase not found with name" + `${req.params.testCaseName}`);
                return res.status(404).send({
                    message: "TestCase not found with name " + req.params.testCaseName
                });
            }
            return res.status(500).send(err.message);
        });
};

//Find by TestCase Name
exports.findById = (req, res) => {
    TestCase.findById({ _id: req.params.id })
        .then(testCase => {
            if (!testCase) {
                logger.error("TestClass not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestClass not found by id " + req.params.id
                });
            }
            else {
                res.status(200).send(testCase);
            }
        }).catch(err => {
            if (err.kind === 'id') {
                logger.error("TestClass not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestCase not found by id " + req.params.id
                });
            }
            return res.status(500).send(err.message);
        });

};

//Find testcase by testClass id
exports.findByClassId = (req, res) => {
    TestCase.find({ TestClass_id: new ObjectId(req.params.classId) })
        .then(testCases => {
            if (!testCases) {
                logger.error("TestCases are found by given Class Id" + `${req.params.classId}`);
                return res.status(404).send({
                    message: "TestCases are found by given Class Id " + req.params.classId
                });
            }
            else {
                return res.status(200).send(testCases);
            }
        }).catch(err => {
            if (err.kind === 'classId') {
                logger.error("TestCases are found by given Class Id" + `${req.params.classId}`);
                return res.status(404).send({
                    message: "TestCases are not found by given classId " + req.params.classId
                });
            }
            return res.status(500).send(err.message);
        });
};

//Find testCase by classId and Id
exports.findByClassIdById = (req, res) => {
    TestCase.find({ TestClass_id: new ObjectId(req.params.classId) }).find({ _id: req.params.id })
        .then(testCase => {
            if (!testCase) {
                logger.error("TestCase not found by given moduleId and id" + `${req.params.moduleId}`);
                return res.status(404).send({
                    message: "TestCase not found by given moduleId and id " + req.params.moduleId
                });
            }
            else {
                return res.status(200).send(testCase);
            }
        }).catch(err => {
            if (err.kind === "classId") {
                logger.error("Test Class not found by classId" + `${req.params.classId}`);
                return res.status(404).send({
                    message: "Test Class not found by classId" + req.params.classId
                });
            }
            else if (err.kind === 'id') {
                logger.error("Test Class not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Test Class not found by id" + req.params.id
                });
            }
            return res.status(500).send(err.message);
        });
};

//Delete testCase by id
exports.delete = (req, res) => {
    TestCase.findByIdAndRemove(req.params.id)
        .then(testCase => {
            if (!testCase) {
                logger.error("TestCase not found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestCase not found with given id" + req.params.id
                });
            }
            return res.status(200).send({ message: "TestCase deleted successfully" });
        }).catch(err => {
            if (err.kind === 'id' || err.name === 'NotFound') {
                logger.error("TestCase not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestCase not found by id" + req.params.id
                });
            }
            return res.status(500).send(err.message);
        });
};

//Create a new testCase
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        logger.error("TestCase content cannot be empty");
        return res.status(400).send({
            message: "TestCase content cannot be empty"
        });
    }
    const newTestCase = new TestCase({
        TestClass_id: req.body.TestClass_id,
        TestCaseName: req.body.TestCaseName,
        TestCaseDescription: req.body.TestCaseDescription,
        TestCaseType: req.body.TestCaseType,
        CreatedBy: (req.body.CreatedBy === null ? null : req.body.CreatedBy),
        ModifiedBy: (req.body.ModifiedBy === null ? null : req.body.ModifiedBy),
        TestCasePriority: req.body.TestCasePriority,
        DependentTestCase: (req.body.DependentTestCase === null ? null : req.body.DependentTestCase)
    });
    newTestCase.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Update the existing test Case
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        logger.error("TestCase content cannot be empty");
        return res.status(400).send({ message: "TestCase content cannot be empty" });
    }
    TestCase.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(testCase => {
            if (!testCase) {
                logger.error("No TestCase found with given id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestCase found with given id " + req.params.id
                });
            }
            else {
                logger.info("TestCase is updated successfully");
                return res.status(200).send({
                    message: "TestCase is updated successfully"
                });
            }
        }).catch(err => {
            if (err.kind === 'id') {
                logger.error("No TestCase found with given id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestCase found with given id " + req.params.id
                });
            }
            else {
                return res.status(404).send(err.message);
            }
        });
};
