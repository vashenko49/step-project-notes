const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.')[1])
    }
});
const upload = multer({ storage: storage });

module.exports.routeList = function (db) {
    router.get('/', function (req, res) {
        res.render('addList');
    });

    router.get('/:id', function (req, res) {
        const id = req.params.id;
        if (!id) {
            res.status(404);
            res.send("id is required");
        } else {

            const filterDb = { _id: ObjectID(id) };
            db.collection(config.collection.card).findOne(filterDb, function (err, result) {
                if (err) {
                    res.status(404);
                    res.send('error select mongo');

                } else {
                    if (result) {
                        res.render('moreInfoList', {title: result.data.title, check_box: result.data.check_box, imgSrc: result.data.attach.filename});

                    } else {
                        res.status(404);
                        res.send("id not found");
                    }
                }
            })
        }
    });

    return router;
};


module.exports.routeAPIList = function (db) {
    router.post('/', upload.single('uploadImg'), function (req, res) {

        const attach = {};

        if(req.file) {
            attach.filename = req.file.filename;
            attach.originalname = req.file.originalname;
        }

        const {id_client, title = '' }= req.body;

        const lists = Array.isArray(req.body.itemList)?req.body.itemList.map(function (element) {
           return {
               text: element,
               done:false
           }

        }):[{
            text: req.body.itemList,
            done:false
        }];

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
                            id_client,
                            type: 'CheckBoxCard',
                            data: {
                                    title,
                                    check_box: lists,
                                    attach
                                }
                            };

                        db.collection(config.collection.card).insertOne(insertOb, (err, result) => {
                            if (err){
                                res.status(404);
                                res.send('error select mongo');
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
                res.send("check_box array length must more 0");
            }
        }
    });

    router.put('/:id?', function(req, res){
        const id = req.params.id;
        if (!id) {
            res.status(404);
            res.send("id is required");
        } else {

            const filterDb = { _id: ObjectID(id) };
            db.collection(config.collection.card).findOne(filterDb, function (err, result) {
                if (err) {
                    res.status(404);
                    res.send('error select mongo');
                } else {
                    
                    if (result) {
                        const updData =  {
                            $set: {
                                    "data.title": req.body.data.title,
                                    "data.check_box": req.body.data.check_box
                                }
                        };
                        db.collection(config.collection.card).updateMany(filterDb, updData ,function(err, result) {
                            if (err) {
                                res.status(404);
                                res.send('error select mongo');
                            } else {
                                
                                if (result) {
                                    res.sendStatus(200);

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
        }
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
                                    res.sendStatus(200);

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