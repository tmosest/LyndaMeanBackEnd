var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Message = require('./models/message');
var User = require('./models/user');

var auth = require('./controllers/auth');
var messages = require('./controllers/message');


var serverPort = 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/message', messages.get);

app.post('/api/message', messages.post);

app.post('/auth/register', auth.register);

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("Connected to Mongo.");
    }
});

var server = app.listen(serverPort, function() {
    console.log("Server opened on port: ", server.address().port);
});