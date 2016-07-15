var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join to ' + room);

//Update h1 tag
jQuery('.room-title').text(room);

socket.on("connect", function(){
  console.log("Connected a user");
  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on("message", function(message){
  var momentTimestamp = moment.utc(message.timestamp);
  var $message = jQuery('.message');

  console.log("New Message: ");
  console.log(message.text);

  //$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h: mm a') +'</strong></p>');
  //$message.append('<p>' + message.text + '</p>');
  jQuery('.messages').append('<p><strong>'+ message.name +': ' + momentTimestamp.local().format('h: mm a') + ': </strong>' + message.text + '</p>');
});

// Message submit part
var $form = jQuery('#messageForm');

$form.on('submit', function(event){
  //To not refresh the whole page every time when user send a message
  event.preventDefault();

  var $message =$form.find('input[name=message]');

    socket.emit('message', {
      name: name,
      text: $message.val()
    });

     $message.val('');

});
