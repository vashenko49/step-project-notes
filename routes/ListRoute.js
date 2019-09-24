const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");


module.exports.routeList = function (db) {
    router.get('/', function (req, res) {
        res.render('addList');
    });

    router.get('/:id', function (req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404)
            res.send("id is required");
        } else {

            const filterDb = { _id: ObjectID(id) };
            db.collection(config.collection.card).findOne(filterDb, function (err, result) {
                if (err) {
                    res.status(404)
                    res.send('error select mongo');

                } else {
                    if (result) {
                        res.render('moreInfoList', {title: result.data.title, check_box: result.data.check_box});

                    } else {
                        res.status(404)
                        res.send("id not found");
                    }
                }
            })
        }
    });

    return router;
};


module.exports.routeAPIList = function (db) {
    router.post('/', function (req, res) {
        const id_client = req.body.id_client;
        const lists = req.body.data.check_box;

        if (id_client && Array.isArray(lists) && lists.length > 0) {
            // проверка клиента в базе
            const filterDb = { _id: ObjectID(id_client) };

            db.collection(config.collection.client).findOne(filterDb, function (err, result) {
                if (err) {
                    res.send('error select mongo');
                } else {

                    // Клиент найден
                    if (result) {
                        const insertOb = {
                            id_client: req.body.id_client,
                            type: 'CheckBoxCard',
                            data: {
                                    title: req.body.data.title || '',
                                    is_img: req.body.data.is_img || false,
                                    check_box: req.body.data.check_box
                                }
                            };

                        db.collection(config.collection.card).insertOne(insertOb, (err, result) => {
                            if (err){
                                res.status(404)
                                res.send('error select mongo');
                            } else {
                                res.send(result.insertedId)
                            }
                        })

                    } else {
                        res.status(404)
                        res.send("id_client not found");
                    }
                }
            })
        } else {
            if (!id_client) {
                res.status(404)
                res.send("id_client is required");
            } else {
                res.status(404)
                res.send("check_box array length must more 0");
            }
        }
    });

    router.put('/:id?', function(req, res){

    });

    router.delete('/:id?', function (req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404)
            res.send("id is required");
        } else {

            const filterDb = { _id: ObjectID(id) };
            db.collection(config.collection.card).findOne(filterDb, function (err, result) {
                if (err) {
                    res.status(404)
                    res.send('error select mongo');
                } else {
                    
                    if (result) {
                        db.collection(config.collection.card).remove(result, function(err, result) {
                            if (err) {
                                res.status(404)
                                res.send('error select mongo');
                            } else {
                                
                                if (result) {
                                    res.send(200);

                                } else {
                                    res.status(404)
                                    res.send("id not found");
                                }
                            }
                        })

                    } else {
                        res.status(404)
                        res.send("id not found");
                    }
                }
            })
        }
    });

    return router;
};