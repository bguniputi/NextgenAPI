'use strict'
const express = require('express');
const app = express();

app.use('/', require('./index'));
app.use('/TestProjects', require('./testProjects.routes'));
app.use('/TestModules', require('./testModules.routes'));
app.use('/TestClasses', require('./testClasses.routes'));
app.use('/TestCases', require('./testCases.routes'));
app.use('/TestResults', require('./testResults.routes'));
app.use('/TestData', require('./testData.routes'));
app.use('/GlobalTestData', require('./testGlobalData.routes'));

module.exports = app;