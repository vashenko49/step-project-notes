const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();


module.exports.routeNotes = function (db) {
    router.get('/:id?', function () {
      
    });


    return router;
};


module.exports.routeAPINotes = function (db) {
    router.get('/:id?', function () {

    });


    return router;
};