'use strict';
const TestModule = require('../models/testModules.model');
const logger = require('../config/logger');

// Retrieve and return all modules from the database.
exports.findAll = (req, res) => {
    TestModule.find({})
        .then(modules => {
            res.send(modules);
        }).catch(err => {

            logger.error(err.message);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving modules."
            });
        });
};

// Find a single module with a name
exports.findByName = (req, res) => {
    TestModule.findOne({ ModuleType: req.params.ModuleType })
        .then(module => {
            if (!module) {

                logger.error("Module not found with name" + `${req.params.ModuleType}`);
                res.status(404).send({
                    message: "Module not found with name" + req.params.ModuleType
                });
            }
            else {
                res.status(200).send(module);
            }
        }).catch(err => {
            if (err.kind === 'ModuleType') {

                logger.error("Module not found with name" + `${req.params.ModuleType}`);
                return res.status(404).send({
                    message: "Module not found with name" + req.params.ModuleType
                });
            }

            logger.error("Error while retrieving module with name" + `${req.params.ModuleType}`);
            return res.status(500).send({
                message: "Error while retrieving module with name" + req.params.ModuleType
            });
        });
};

//Find a single module by Id
exports.findById = (req, res) => {
    TestModule.findById({ _id: req.params.id })
        .then(module => {
            if (!module) {

                logger.error("Module not found by id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "Module not found by id " + req.params.id
                });
            }
            else {
                return res.status(200).send(module);
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("Module not found by id " + `${req.params.id}`);
                return res.status(404).send({
                    message: "Module not found by id " + req.params.id
                });
            }
            else {

                logger.error("Error while retrieving module by id " + `${req.params.id}`);
                return res.status(500).send({
                    message: "Error while retrieving module by id " + req.params.id
                });
            }
        });
};

//Delete module by id
exports.delete = (req, res) => {
    TestModule.findByIdAndRemove(req.params.id)
        .then(module => {
            if (!module) {

                logger.error("Module not found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Module not found with given id" + req.params.id
                });
            }
            res.send({ message: "Module deleted successfully" });
        }).catch(err => {
            if (err.kind === 'id' || err.name === 'NotFound') {

                logger.error("Module not found by id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Module not found by id" + req.params.id
                });
            }

            logger.error("Could not delete module with given id" + `${req.params.id}`);
            res.status(500).send({
                message: "Could not delete module with given id" + req.params.id
            });
        });
};

//Create a new Project
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Module content cannot be empty");
        return res.status(400).send({ message: "Module content cannot be empty" });
    }
    var isActive;
    if (req.body.IsActive === null) {
        isActive = false;
    }
    else {
        isActive = req.body.IsActive;
    }
    const newModule = new TestModule({
        moduleType: req.body.ModuleType,
        CreatedDTM: Date.now(),
        ModifiedDTM: Date.now(),
        IsActive: isActive
    });
    newModule.save()
        .then(data => { res.status(201).send(data); })
        .catch(err => {

            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Update the existing Project
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Module content cannot be empty");
        return res.status(400).send({ message: "Module content cannot be empty" });
    }
    TestModule.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(module => {
            if (!module) {

                logger.error("No Module found with given id " + `${req.params.id}`);
                return res.status(404).send({ message: "No Module found with given id " + req.params.id });
            }
            else {
                return res.status(200).send({ message: "Module is updated successfully" });
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("No Module found with given id " + `${req.params.id}`);
                return res.status(404).send({ message: "No Module found with given id " + req.params.id });
            }
            else {

                logger.error(err.message);
                return res.status(404).send(err);
            }
        });
};