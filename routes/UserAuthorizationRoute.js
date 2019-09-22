const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");

module.exports.routeAuthorization = function (db) {
    router.get('/registrationform',function (req,res) {
        res.render('modalWindowSingup.pug')
    });

    router.post('/', function (req,res) {
        const  client = {
            login: req.body.login,
            password:req.body.password
        };

        db.collection(config.collection.client).findOne(client,function (err, result) {
            if(err){
                res.send('error');
            }else {
                if(result){
                    res.send(result['_id']);
                }else {
                    res.send("error")
                }
            }
        })
    });

    router.get('/createalerform', function (req,res) {
        res.render('modalWindowErrorSingUp.pug')
    });


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

