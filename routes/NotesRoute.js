const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");

module.exports.routeNotes = function (db) {
    router.get('/', function (req, res) {
        res.render('addNote')
    });

    router.get('/:id', function (req, res) {
        if(req.params.id.length===24){
            db.collection(config.collection.card)
                .findOne({"_id": new ObjectID(req.params.id)}, function (err, note) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('moreInfoNote', {title: note.data.title, text: note.data.text})
                    }
                });
        }else {
           res.status(400);
           res.send('error')
        }

    });

    return router;
};


module.exports.routeAPINotes = function (db) {
    router.get('/:id?', function () {

    });


    return router;
};