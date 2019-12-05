'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.status(200).json('WelCome to Nextgen RestAPI');
});

module.exports = router;
