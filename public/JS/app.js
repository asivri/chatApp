var socket = io();

socket.on("connect", function(){
  console.log("Connected a user");
})
