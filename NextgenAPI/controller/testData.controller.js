'use strict';
const TestData = require('../models/testData.model');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../config/logger');

// Retrieve and return all testData
exports.findAll = (req, res) => {
    TestData.find({})
        .then(testData => {
            res.send(testData);
        }).catch(err => {

            logger.error("Some error occurred while retriving testData");
            res.status(500).send({
                message: err.message || "Some error occurred while retriving testData's."
            });
        });
};


// Find a testData by testcase id
exports.findByTestCaseId = (req, res) => {
    TestData.find({ TestCase_Id: new ObjectId(req.params.testCaseId)})
        .then(testData => {
            if (!testData) {

                logger.error("Test data not found by testcase id" + `${req.params.testCaseId}`);
                res.status(404).send({
                    message: "Test data not found by testcase id" + req.params.testCaseId
                });
            }
            else {
                res.status(200).send(testData);
            }
        }).catch(err => {
            if (err.kind === 'testCaseId') {

                logger.error("Test data not found by testcase id" + `${req.params.testCaseId}`);
                return res.status(404).send({
                    message: "Test data not found by testcase id" + req.params.testCaseId
                });
            }

            logger.error("Error while retrieving test data by testcase id" + `${req.params.testCaseId}`);
            return res.status(500).send({
                message: "Error while retrieving test data by testcase id" + req.params.testCaseId
            });
        });
};

//Create new testData
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("TestData content cannot be empty");
        return res.status(400).send({
            message: "TestData content cannot be empty"
        });
    }
    if (!req.body.hasOwnProperty('TestCase_Id')
        || !req.body.hasOwnProperty('Order')
        || !req.body.hasOwnProperty('IsActive')) {

        logger.error("TestCase_Id or Order or IsActive keys are not found");
        return res.status(400).send({
            message: "TestCase_Id or Order or IsActive keys are not found"
        });
    }
    if (req.body.TestCase_Id === null
        || !req.body.Order === null
        || !req.body.IsActive === null) {

        logger.error("TestCase_Id or Order or IsActive keys cannot be NULL");
        return res.status(400).send({
            message: "TestCase_Id or Order or IsActive keys cannot be NULL"
        });
    }
    const newTestData = new TestData(req.body);
    newTestData.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {

            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Delete testData by id
exports.delete = (req, res) => {
    TestData.findByIdAndRemove(req.params.id)
        .then(testData => {
            if (!testData) {

                logger.error("TestData not found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestData not found with given id" + req.params.id
                });
            }
            res.status(200).send({ message: "TestData deleted successfully" });
        }).catch(err => {
            if (err.kind === 'id' || err.name === 'NotFound') {

                logger.error("TestData not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "TestData not found by id" + req.params.id
                });
            }
            res.status(500).send(err.message);
        });
};

//Update testData by id
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("TestData content cannot be empty");
        return res.status(400).send({ message: "TestData content cannot be empty" });
    }
    TestData.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(testData => {
            if (!testData) {

                logger.error("No TestData found with given id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestData found with given id " + req.params.id
                });
            }
            else {
                return res.status(200).send({
                    message: "TestData is updated successfully"
                });
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("No TestData found with given id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "No TestData found with given id " + req.params.id
                });
            }
            else {

                logger.error(err.message);
                return res.status(404).send(err.message);
            }
        });
};