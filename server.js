//Configuration for the app
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

//TODO: Improve the code and add username

io.on('connection', function(socket){
  console.log('A user connected!');

  socket.on('message', function(message){
    console.log('Message recieved: ' + message.text);

    //valueOf returns JS timestamp
    message.timestamp = moment().valueOf();
    //Send the message everybody includes the sender
    io.emit('message', message);
  });

  //Adding message time to the app

  socket.emit('message', {
    text: 'Welcome to the app!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function(){
  console.log('Listening');
});
