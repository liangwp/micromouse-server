'use strict';

const http = require("http");
const express = require("express");
const WebSocket = require('uws')

var app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({"host": server, "port": 8082}); // websocket server must use a different port from the http server

var port = 8080;

app.use('/', express.static(__dirname+"/www"));

app.get('/api', function (req, res) {
    res.send("API hello world");
});

wss.on('connection', function (ws, req) {
    ws.on("message", function (message) {
        console.log("server - received via websocket: " + message);
        console.log("server - send reply");
        ws.send("replied via websocket");
    });
});
wss.on("listening", function () {
    console.log("ws server is listening");
})
wss.on("error", function (err) {
    console.log(err);
});

app.listen(port, function () {
    console.log("App listening on port " + port);
});

// do a websocket connection to a micromouse running on the client
// potential for multiple micromouses to run in the same maze
