var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serverPort = 5000;

app.use(bodyParser.json());

app.post('/api/message', function(req, res) {
    console.log(req.body);
    res.status(200);
});

var server = app.listen(serverPort, function() {
    console.log("Server opened on port: ", server.address().port);
});