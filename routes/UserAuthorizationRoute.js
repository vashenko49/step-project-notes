const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");

module.exports.routeAuthorization = function (db) {
    router.post('/registration', function (req, res) {
        const  client = {
            login: req.body.login,
            password:req.body.password
        };
        db.collection(config.collection.client).insertOne(client,(err,result)=>{
            if(err){
                res.send('error');
            }else {
                res.send(result.insertedId)
            }
        })

    });
    return router;
};

