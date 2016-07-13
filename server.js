//Configuration for the app
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

//TODO: Improve the code and add username
//TODO: Fix below
socketio.on('connection', function(){
  console.log('A user connected!');
});

http.listen(PORT, function(){
  console.log('Listening');
});
