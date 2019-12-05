'use strict';
const GlobalTestData = require('../models/testGlobalData.model');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../config/logger');

// Retrieve and return all globalTestData
exports.findAll = (req, res) => {
    GlobalTestData.find({})
        .then(globalTestData => {
            res.send(globalTestData);
        }).catch(err => {

            logger.error(err.message);
            res.status(500).send({
                message: err.message || "Some error occurred while retriving globalTestData's."
            });
        });
};


// Find a globalTestData by project id
exports.findByProjectId = (req, res) => {
    GlobalTestData.find({ Project_id: new ObjectId(req.params.projectId) })
        .then(globalTestData => {
            if (!globalTestData) {

                logger.error("Global testData not found by project id" + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "Global testData not found by project id" + req.params.projectId
                });
            }
            else {
                return res.status(200).send(globalTestData);
            }
        }).catch(err => {
            if (err.kind === 'projectId') {

                logger.error("Global testData not found by project id" + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "Global testData not found by project id" + req.params.projectId
                });
            }

            logger.error("Error while retrieving global testData by project id" + `${req.params.projectId}`);
            return res.status(500).send({
                message: "Error while retrieving global testData by project id" + req.params.projectId
            });
        });
};

//Create new global testData
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Global testData content cannot be empty");
        return res.status(400).send({
            message: "Global testData content cannot be empty"
        });
    }
    if (!req.body.hasOwnProperty('Project_id')
        || !req.body.hasOwnProperty('IsActive')) {

        logger.error("Project_id or IsActive keys are not found");
        return res.status(400).send({
            message: "Project_id or IsActive keys are not found"
        });
    }
    if (req.body.Project_id === null
        || !req.body.IsActive === null) {

        logger.error("Project_id or IsActive keys cannot be NULL");
        return res.status(400).send({
            message: "Project_id or IsActive keys cannot be NULL"
        });
    }
    const newGlobalTestData = new GlobalTestData(req.body);
    newGlobalTestData.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {

            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Delete global testData by project id
exports.delete = (req, res) => {
    GlobalTestData.findOneAndRemove({ Project_id: new ObjectId(req.params.projectId) })
        .then(globalTestData => {
            if (!globalTestData) {

                logger.error("Global testData not found by project id" + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "Global testData not found by project id" + req.params.projectId
                });
            }
            res.status(200).send({ message: "Global testData deleted successfully" });
        }).catch(err => {
            if (err.kind === 'projectId' || err.name === 'NotFound') {

                logger.error("Global testData not found by project id" + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "Global testData not found by project id" + req.params.projectId
                });
            }
            res.status(500).send(err.message);
        });
};

//Update global testData by project id
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Global testData content cannot be empty");
        return res.status(400).send({ message: "Global testData content cannot be empty" });
    }
    GlobalTestData.findOneAndUpdate({ Project_id: new ObjectId(req.params.projectId) }
        , { $set: req.body })
        .then(globalTestData => {
            if (!globalTestData) {

                logger.error("No global testData found with given project id " + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "No global testData found with given project id " + req.params.projectId
                });
            }
            else {
                return res.status(200).send({
                    message: "Global testData is updated successfully"
                });
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("No global testData found with given project id " + `${req.params.projectId}`);
                return res.status(404).send({
                    message: "No global testData found with given project id " + req.params.projectId
                });
            }
            else {

                logger.error(err.message);
                return res.status(404).send(err.message);
            }
        });
};
