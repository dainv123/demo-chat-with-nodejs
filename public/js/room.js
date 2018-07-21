/**
 * thí í file js
 */
var socket = io("http://localhost:3200");

var body = document.querySelector("body");
var register = document.querySelector(".register");
var register_input = document.querySelector(".register input");
var register_button = document.querySelector(".register button");
var list_user_ul = document.querySelector(".list-user ul");
var chat = document.querySelector(".chat");
var info_user_span = document.querySelector(".info-user span");
// var info_user_logout = document.querySelector(".info-user button");
var sms_user_button = document.querySelector(".sms-user button");
var sms_user_input = document.querySelector(".sms-user input");
var content_list_chat = document.querySelector(".content-list-chat");

register_button.onclick = function() {
  socket.emit("Client register room", { name: register_input.value });
};

socket.on("Server list room", function(data) {
  list_user_ul.innerHTML = "";
  data.room.forEach(element => {
    var node_li = document.createElement("li");
    node_li.innerText = element;
    list_user_ul.appendChild(node_li);
  });
});

socket.on("Server send current room", function(data) {
    info_user_span.innerText = data.room;
  });

sms_user_button.onclick = function() {
    socket.emit("Client chat", { sms: sms_user_input.value });
  };

  socket.on("Server chat", function(data) {
    // info_user_span.innerText = data.room;
    console.log(123, data);
  });