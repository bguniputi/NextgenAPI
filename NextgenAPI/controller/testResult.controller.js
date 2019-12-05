'use strict';
const TestResult = require('../models/testResults.model');
const logger = require('../config/logger');

// Retrieve and return all test results from the database.
exports.findAll = (req, res) => {
    TestResult.find({})
        .sort({ ExecutedDTM : -1})
        .then(testResults => {
            res.status(200).send(testResults);
        }).catch(err => {

            logger.error(err.message);
            res.status(500).send(err.message);
        });
};

// Find test results by test cycle name
exports.findByCycleName = (req, res) => {
    TestResult.find({ TestCycle: req.params.TestCycleName })
        .sort({ ExecutedDTM: req.query.orderBy })
        .then(testResults => {
            if (!testResults) {

                logger.error("Test results are not found with test cycle name " + `${req.params.TestCycleName}`);
                return res.status(404).send({
                    message: "Test results are not found with test cycle name " + req.params.TestCycleName
                });
            }
            else {
                return res.status(200).send(testResults);
            }
        }).catch(err => {
            if (err.kind === 'TestCycleName') {

                logger.error("Test results are not found with test cycle name " + `${req.params.TestCycleName}`);
                return res.status(404).send({
                    message: "Test results are not found with test cycle name " + req.params.TestCycleName
                });
            }
            return res.status(500).send(err.message);
        });
};

//Create a new test result
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Test result content cannot be empty");
        return res.status(400).send({
            message: "Test result content cannot be empty"
        });
    }
    const newTestResult = new TestResult({
        TestCase_Id: req.body.TestCaseId,
        TestCycle: req.body.TestCycleName,
        Result: req.body.Result,
        ExecutedDTM: req.body.ExecutedDTM,
        Resultsets: req.body.Resultsets
    });

    newTestResult.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {

            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Delete test results by test cycle name
exports.DeleteByTestCycleName = (req, res) => {
    TestResult.deleteMany({ TestCycle: req.params.TestCycleName})
        .then(testResults => {
            if (!testResults) {

                logger.error("Test results are not found with given cycle name " + `${req.params.TestCycleName}`);
                return res.status(404).send({
                    message: "Test results are not found with given cycle name " + req.params.TestCycleName
                });
            }

            return res.status(200).send({ message: "Test results deleted successfully" });
        }).catch(err => {
            if (err.kind === 'TestCycleName' || err.name === 'NotFound') {

                logger.error("Test results are not found with given cycle name " + `${req.params.TestCycleName}`);
                return res.status(404).send({
                    message: "Test results are not found with given cycle name " + req.params.TestCycleName
                });
            }
            return res.status(500).send(err.message);
        });

};