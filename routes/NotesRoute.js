const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();


module.exports.routeNotes = function (db) {
    router.get('/', function (req, res) {
        res.render('addNote')
    });


    return router;
};


module.exports.routeAPINotes = function (db) {
    router.get('/:id?', function () {

    });


    return router;
};