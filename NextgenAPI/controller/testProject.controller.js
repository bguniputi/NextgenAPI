'use strict';
const TestProject = require('../models/testProject.model');
const logger = require('../config/logger');

// Retrieve and return all projects from the database.
exports.findAll = (req, res) => {
    TestProject.find({})
        .then(projects => {
            res.status(200).send(projects);
        }).catch(err => {

            logger.error(err.message);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving projects."
            });
        });
    };


// Find a single project with a name
exports.findByName = (req, res) => {
    TestProject.findOne({ ProjectName: req.params.ProjectName })
        .then(project => {
            if (!project) {

                logger.error("Project not found with name" + `${req.params.projectName}`);
                res.status(404).send({
                    message: "Project not found with name" + req.params.projectName
                });
            }
            else {
                res.status(200).send(project);
            }
        }).catch(err => {
            if (err.kind === 'projectName') {

                logger.error("Project not found with name" + `${req.params.projectName}`);
                return res.status(404).send({
                    message: "Project not found with name" + req.params.projectName
                });
            }

            logger.error("Error while retrieving project with name" + `${req.params.projectName}`);
            res.status(500).send({
                message: "Error while retrieving project with name" + req.params.projectName
            });
        });

};

// Find a single project by id
exports.findById = (req, res) => {
    TestProject.findById({_id: req.params.id })
        .then(project => {
            if (!project) {

                logger.error("Project not found by id" + `${req.params.id}`);
                res.status(404).send({
                    message: "Project not found by id" + req.params.id
                });
            }
            else {
                res.status(200).send(project);
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("Project not found by id" + `${req.params.id}`);
               res.status(404).send({
                    message: "Project not found by id" + req.params.id
                });
            }

            logger.error("Error while retrieving project by id" + `${req.params.id}`);
            res.status(500).send({
                message: "Error while retrieving project by id" + req.params.id
            });
        });
};

//Delete a project with the specified project name in the request
exports.delete = (req, res) => {
    TestProject.findByIdAndRemove(req.params.id)
        .then(project => {
            if (!project) {

                logger.error("Project not found with given id" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Project not found with given id" + req.params.id
                });
            }
            res.send({ message: "Project deleted successfully" });
        }).catch(err => {
            if (err.kind === 'id' || err.name === 'NotFound') {

                logger.error("Project not found with name" + `${req.params.id}`);
                return res.status(404).send({
                    message: "Project not found with name" + req.params.id
                });
            }

            logger.error("Could not delete project with given id" + `${req.params.id}`);
            res.status(500).send({
                message: "Could not delete project with given id" + req.params.id
            });
        });
};

//Create a new Project
exports.CreateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Project content cannot be empty");
        return res.status(400).send({ message:"Project content cannot be empty" });
    }
    var isActive;
    if (req.body.IsActive === null) {
        isActive = false;
    }
    else {
        isActive = req.body.IsActive;
    }
    const newProject = new TestProject({
        ProjectName: req.body.ProjectName,
        Regulator: req.body.Regulator,
        CreatedDTM: Date.now(),
        IsActive: isActive
    });
    newProject.save()
        .then(data => { res.status(201).send(data); })
        .catch(err => {

            logger.error(err.message);
            res.status(401).send({ message: err.message });
        });
};

//Update the existing Project
exports.UpdateOne = (req, res) => {
    if (Object.keys(req.body).length === 0) {

        logger.error("Project content cannot be empty");
        return res.status(400).send({ message: "Project content cannot be empty" });
    }
    TestProject.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(project => {
            if (!project) {

                logger.error("No Project found with given id " + `${req.params.id}`);
                res.status(404).send({ message: "No Project found with given id " + req.params.id });
            }
            else {
                res.status(200).send({ message:"Project is updated successfully" });
            }
        }).catch(err => {
            if (err.kind === 'id') {

                logger.error("No Project found with given id " + `${req.params.id}`);
                res.status(404).send({ message: "No Project found with given id " + req.params.id });
            }
            else {

                logger.error(err.message);
                res.status(404).send(err);
            }
        });
};