const express = require('express');
const bodyParser  = require('body-parser');
const config = require("../config/db");
const pug = require('pug');
const notes = require('./NotesRoute');
const list = require('./ListRoute');
const authorization = require('./UserAuthorizationRoute');

module.exports = function (app, connection) {
    app.use((req, res, next )=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
    app.use(express.static('storage'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.set('view engine', 'pug');
    app.set('views', './views');

    app.get('/',function (req,res) {
        res.render('index');
    });


    app.use('/authorization',authorization.routeAuthorization(connection.db(config.collection.client)));
    app.use('/notes', notes.routeNotes(connection.db(config.collection.card)));
    app.use('/api/notes', notes.routeAPINotes(connection.db(config.collection.card)));
    app.use('/list', list.routeList(connection.db(config.collection.card)));
    app.use('/api/list', list.routeAPIList(connection.db(config.collection.card)));

};