var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var moment = require('moment');

var mongoose = require('mongoose');
var Message = require('./models/message');
var User = require('./models/user');

var auth = require('./controllers/auth');
var messages = require('./controllers/message');

var cors = require('./services/cors');
var checkAuthorization = require('./services/checkAuthorization');

var serverPort = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors);

// Requests
app.get('/api/message', messages.get);
app.post('/api/message', checkAuthorization, messages.post);
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);


// Connection
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("Connected to Mongo.");
    }
});

// Run server
var server = app.listen(serverPort, function() {
    console.log("Server opened on port: ", server.address().port);
});