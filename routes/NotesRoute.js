const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");

module.exports.routeNotes = function (db) {
    router.get('/', function (req, res) {
        res.render('addNote')
    });

    router.get('/:id', function (req, res) {
        db.collection(config.collection.card)
            .findOne({_id: ObjectID(req.params.id)}, function (err, note) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('moreInfoNote', {title: note.data.title, text: note.data.text})
                }
            });

    });

    return router;
};


module.exports.routeAPINotes = function (db) {
    router.get('/:id?', function () {

    });


    return router;
};