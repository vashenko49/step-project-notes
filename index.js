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

    let port = process.env.PORT || 3030;
    
    app.listen(port, () => {
        console.log('turn on!');
    });

    // client.close();
});
