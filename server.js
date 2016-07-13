//Configuration for the app
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

//TODO: Improve the code and add username
//TODO: Fix below
io.on('connection', function(socket){
  console.log('A user connected!');

  socket.on('message', function(message){
    console.log('Message recieved ' + message.text);

    //Send the message everybody but the sender
    socket.broadcast.emit('message', message);
  });

  socket.emit('message', {
    text: 'Welcome to the app!'
  });
});

http.listen(PORT, function(){
  console.log('Listening');
});
