const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");
const multer  = require('multer');
const upload = multer({ dest: 'upload/' })

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
    router.post('/', upload.single('uploadImg'), function (req, res) {

        const id_client = req.body.id_client,
              text = req.body.text,
              title = req.body.title,
              attach = {};

        if(req.file) {
            attach.filename = req.file.filename,
            attach.originalname = req.file.originalname
        }

        if (id_client && text) {
            db.collection(config.collection.client)
                .findOne({ _id: ObjectID(id_client) }, function (err, result) {
                    if (err) {
                        res.send('selecting error in mongodb');
                    } else {
                        if (result) {
                            const insertObj = {
                                id_client: id_client,
                                type: 'UsuallCard',
                                data: {
                                    title,
                                    text,
                                    attach
                                }
                            };

                            db.collection(config.collection.card)
                                .insertOne(insertObj, (err, result) => {
                                    if (err){
                                        res.status(404);
                                        res.send('inserting error in mongodb');
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

    router.put('/:id?', function (req, res) {
        const id = req.params.id;
        db.collection(config.collection.card)
            .findOne({ _id: ObjectID(id) }, function (err, result) {
                if (err) {
                    res.send('selecting error in mongodb');
                } else {
                    if (result) {
                        const updateObj = {
                            $set: {
                                "data.title": req.body.data.title,
                                "data.text": req.body.data.text
                            }
                        };

                        db.collection(config.collection.card)
                            .updateOne({ _id: ObjectID(id) }, updateObj, (err, result) => {
                                if (err){
                                    res.status(404);
                                    res.send('updating error in mongodb');
                                } else {
                                    if (result) {
                                        res.sendStatus(200);
                                    } else {
                                        res.status(404);
                                        res.send("id not found while updating");
                                    }
                                }
                            })

                    } else {
                        res.status(404);
                        res.send("id not found");
                    }
                }
            })
    });

    router.delete('/:id?', function (req, res) {
        const id = req.params.id;
        db.collection(config.collection.card)
            .findOne({ _id: ObjectID(id) }, function (err, result) {
            if (err) {
                res.status(404);
                res.send('selecting error in mongodb');
            } else {
                if (result) {
                    db.collection(config.collection.card)
                        .deleteOne(result, function(err, result) {
                        if (err) {
                            res.status(404);
                            res.send('deleting error in mongodb');
                        } else {
                            if (result) {
                                res.send(200);
                            } else {
                                res.status(404);
                                res.send("id not found");
                            }
                        }
                    })
                } else {
                    res.status(404);
                    res.send("id not found");
                }
            }
        })
    });

    return router;
};
