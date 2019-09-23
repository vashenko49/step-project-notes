const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();


module.exports.routeList = function (db) {
    router.get('/', function (req, res) {
        res.render('addList')
    });

    return router;
};


module.exports.routeAPIList = function (db) {
    router.get('/:id?', function () {

    });

    return router;
};