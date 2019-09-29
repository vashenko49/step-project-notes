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

                        let attach = element.data.hasOwnProperty('attach') && element.data.attach.hasOwnProperty('filename');

                        if(element.type.toUpperCase()==="UsuallCard".toUpperCase() || element.type.toUpperCase()==="UsualCard".toUpperCase()){
                            cards+=render.renderUsualCard(element['_id'],element.data.title,element.data.text.length<100?element.data.text:(element.data.text.substring(0,100)+"..."),element.type, attach);
                        }else {
                            cards+=render.renderCheckBox(element['_id'],element.data.title,element.data.check_box,element.type, attach);
                        }
                    })
                }
            }
            res.send(cards)
        });
    });
    return router;
};
