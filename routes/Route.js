const express = require('express');
const bodyParser  = require('body-parser');
const pug = require('pug');
const notes = require('./NotesRoute');
const list = require('./ListRoute');
const authorization = require('./UserAuthorizationRoute');

module.exports = function (app, database) {
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


    app.use('/authorization',authorization.routeAuthorization(database));
    app.use('/notes', notes.routeNotes(database));
    app.use('/api/notes', notes.routeAPINotes(database));
    app.use('/list', list.routeList(database));
    app.use('/api/list', list.routeAPIList(database));

};