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
var info_user_logout = document.querySelector(".info-user button");
var sms_user_button = document.querySelector(".sms-user button");
var sms_user_input = document.querySelector(".sms-user input");
var content_list_chat = document.querySelector(".content-list-chat");

chat.classList.add("hide");

register_button.onclick = function() {
  socket.emit("Client register", { name: register_input.value });
};

socket.on("Server send register fail", function() {
  alert("Register faild!!!!!!!!!!");
});

socket.on("Server send register success", function(data) {
  alert(data.name + ", Register success!!!!!!!!!!");
  chat.classList.remove("hide");
  register.classList.add("hide");
  info_user_span.innerText = data.name;
});

socket.on("Server send list user", function(data) {
  list_user_ul.innerHTML = "";
  data.listUser.forEach(element => {
    var node_li = document.createElement("li");
    node_li.innerText = element;
    list_user_ul.appendChild(node_li);
  });
});

info_user_logout.onclick = function() {
  socket.emit("Logout");
  chat.classList.add("hide");
  register.classList.remove("hide");
};

sms_user_button.onclick = function() {
  socket.emit("Client send sms", { sms: sms_user_input.value });
};

socket.on("Server send sms", function(data) {
  var node_p = document.createElement("p");
  node_p.innerText = data.name + ": " + data.sms;
  content_list_chat.append(node_p);
});

sms_user_input.onfocus = function() {
  socket.emit("Client focus");
};

sms_user_input.onblur = function() {
  socket.emit("Client blur");
};

socket.on("Server focus", function(data) {
  console.log(data.name + " writing");
});

socket.on("Server blur", function(data) {
  console.log(data.name + " not write");
});
