//Configuration for the app
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket){
  console.log('A user connected!');

  socket.on('joinRoom', function(req){
      clientInfo[socket.id] = req;
      clientInfo.name = req;
      socket.join(req.room);
      socket.broadcast.to(req.room).emit('message', {
        name: 'System',
        text: req.name + ' has joined!',
        timestamp: moment().valueOf()
      })
  });

  socket.on('message', function(message){
    console.log('Message recieved: ' + message.text);

    //valueOf returns JS timestamp
    message.timestamp = moment().valueOf();

    //Send the message everybody includes the sender
    io.to(clientInfo[socket.id].room).emit('message', message);
  });

  //Adding message time to the app

  socket.emit('message', {
    name: 'System',
    text: 'Welcome to the app!',
    timestamp: moment().valueOf()
  });
});

http.listen(PORT, function(){
  console.log('Listening');
});
