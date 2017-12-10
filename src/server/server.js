'use strict';

const express = require("express");
var app = express();

var port = 8080;

app.use('/', express.static(__dirname+"/www"));

app.get('/api', function (req, res) {
    res.send("API hello world");
});

app.listen(port, function () {
    console.log("App listening on port " + port);
});

// do a websocket connection to a micromouse running on the client
// potential for multiple micromouses to run in the same maze