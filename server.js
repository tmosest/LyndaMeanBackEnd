var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Message = mongoose.model('Message', {
    msg: String
});

var serverPort = 5000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/api/message', GetMessages);

app.post('/api/message', function(req, res) {
    console.log(req.body);
    
    var message = new Message(req.body);
    message.save();

    res.status(200);
});

function GetMessages(req, res)
{
    Message.find({}).exec(function(err, result) {
        res.send(result);
    });
}

app.post('/auth/register', function(req, res) {
    console.log(req.body);
});

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("Connected to Mongo.");
    }
});

var server = app.listen(serverPort, function() {
    console.log("Server opened on port: ", server.address().port);
});