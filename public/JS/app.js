var socket = io();

socket.on("connect", function(){
  console.log("Connected a user");
});

socket.on("message", function(message){
  console.log("New Message: ");
  console.log(message.text);
});
