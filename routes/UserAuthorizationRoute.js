const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();


module.exports.routeAuthorization = function (db) {
    router.get('/checkUser?', function () {

    });
    return router;
};

