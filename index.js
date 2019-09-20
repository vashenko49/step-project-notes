const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config/db');

const app = express();

const client = new mongoClient(dbConfig.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

client.connect((err, connection) => {
    
    app.listen('3000', () => {
        console.log('We are live!');
    });

    // perform actions on the collection object
    // client.close();
});
