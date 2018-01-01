
document.addEventListener('DOMContentLoaded', init); // works in chrome
function init() {
    
    // set body.onload in script instead of in html doc
    if (document.body) {
        document.body.onload = function () {
            brython();
        }
    }
    
    var el = document.getElementById("justatest");
    setTimeout(function () {
        el.innerHTML = "timeout from javascript";
    }, 3000);
    
    window.test = function(value) {
        console.log("test: " + value);
    }
    
    doWebSocketTest();
}

function doWebSocketTest() {
    //var socket = new WebSocket('ws://demos.kaazing.com/echo');
    var socket = new WebSocket('ws://localhost:8082');
    socket.addEventListener('error', function (event) {
        console.log("an error occurred... duh");
    });
    socket.addEventListener('open', function (event) {
        console.log("send message to server");
        socket.send("hello server");
    });
    socket.addEventListener("message", function (event) {
        console.log("Received from server: " + event.data)
    });
}
