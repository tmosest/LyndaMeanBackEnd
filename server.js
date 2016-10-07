var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var database;
var serverPort = 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.post('/api/message', function(req, res) {
    console.log(req.body);
    database.collection('messages').insertOne(req.body);
    res.status(200);
});

mongo.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("Connected to Mongo.");
        database = db;
    }
});

var server = app.listen(serverPort, function() {
    console.log("Server opened on port: ", server.address().port);
});