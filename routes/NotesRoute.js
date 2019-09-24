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
    router.post('/', function (req, res) {
        const id_client = req.body.id_client;
        const text = req.body.data.text;

        if (id_client && text) {
            db.collection(config.collection.client)
                .findOne({ _id: ObjectID(id_client) }, function (err, result) {
                if (err) {
                    res.send('error select mongo');
                } else {
                    if (result) {
                        const insertObj = {
                            id_client: req.body.id_client,
                            type: 'UsualCard',
                            data: {
                                title: req.body.data.title || '',
                                is_img: req.body.data.is_img || false,
                                check_box: req.body.data.text
                            }
                        };

                        db.collection(config.collection.card)
                            .insertOne(insertObj, (err, result) => {
                            if (err){
                                res.status(404);
                                res.send('inserting error');
                            } else {
                                res.send(result.insertedId)
                            }
                        })

                    } else {
                        res.status(404);
                        res.send("id_client not found");
                    }
                }
            })
        } else {
            if (!id_client) {
                res.status(404);
                res.send("id_client is required");
            } else {
                res.status(404);
                res.send("note text is required");
            }
        }
    });


    return router;
};