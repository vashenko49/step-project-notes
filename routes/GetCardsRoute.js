const express = require('express');
var ObjectID = require('mongodb').ObjectID;
const router = express.Router();
const config = require("../config/db");

const render = require('../views/renderCards');


module.exports.getcards = function (db) {
    router.post('/all', function (req,res) {
        db.collection(config.collection.card).find({"id_client":req.body["id_client"]}).toArray(function (err, result) {
            let cards='';
            if(Array.isArray(result)){
                if(result.length>0){
                    result.forEach(element=>{
                        if(element.type==="UsuallCard"){
                            cards+=render.renderUsualCard(element['_id'],element.data.title,element.data.text.length<100?element.data.text:(element.data.text.substring(0,100)+"..."));
                        }else {
                            cards+=render.renderCheckBox(element['_id'],element.data.title,element.data.check_box);
                        }
                    })
                }
            }
            res.send(cards)
        });
    });
    return router;
};
