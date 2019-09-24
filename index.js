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

    require("./routes/Route")(app, connection.db(dbConfig.dataBase));

    app.listen('3030', () => {
        console.log('turn on!');
    });

    // client.close();
});
