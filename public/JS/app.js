var socket = io();

socket.on("connect", function(){
  console.log("Connected a user");
});

socket.on("message", function(message){
  console.log("New Message: ");
  console.log(message.text);
});

// Message submit part
var $form = jQuery('#messageForm');

$form.on('submit', function(event){
  //To not refresh the whole page every time when user send a message
  event.preventDefault();

  var $message =$form.find('input[name=message]');

    socket.emit('message', {
      text: $message.val()
    });

     $message.val('');

});
