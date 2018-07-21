var fs = require("fs");
var tmpl = require("blueimp-tmpl");
var express = require("express");
var app = express();
var server = app.listen(3200);
var io = require("socket.io").listen(server);
var listUser = [];

app.use("/assets", express.static("public"));

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/contact/:id/send/:content", function(req, res) {
  res.send("Result__ id:" + req.params.id + " __content:" + req.params.content);
});

app.get("/:content", function(req, res) {
  var data = {
    title: "JavaScript Templates",
    url: "https://github.com/",
    features: ["lightweight & fast", "powerful", "zero dependencies"]
  };

  tmpl.load = function(id) {
    var filename = "./page/" + id + ".html";
    return fs.readFileSync(filename, "utf8");
  };

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(tmpl(req.params.content, data));
});

io.on("connection", function(socket) {
  console.log("Chao mung: " + socket.id);
  socket.on("disconnect", function() {
    console.log(socket.id + " ________ is Leave, :((");
  });

  /**
   * Demo template.html
   */
  socket.on("Send data to server", function(data) {
    console.log("Mess from " + socket.id + ": " + data.sms);
    var post_mess = { userid: socket.id, sms: data.sms };
    // socket.emit('Send data to client', post_mess);
    // socket.broadcast.emit('Send data to client', post_mess);
    // io.to.emit(____socket.id____);
    io.sockets.emit("Send data to client", post_mess);
  });

  socket.on("Send background to server", function(data) {
    var post_mess = { userid: socket.id, background: data.sms };
    io.sockets.emit("Send background to client", post_mess);
  });

  /**
   * Demo chat.html
   */
  socket.on("Client register", function(data) {
    if (listUser.indexOf(data.name) >= 0) {
      socket.emit("Server send register fail");
    } else {
      listUser.push(data.name);
      socket.name = data.name;
      io.sockets.emit("Server send list user", { listUser: listUser });
      socket.emit("Server send register success", { name: data.name });
    }
  });

  socket.on("Logout", function() {
    listUser.splice(listUser.indexOf(socket.name), 1);
    socket.broadcast.emit("Server send list user", {
      listUser: listUser
    });
  });

  socket.on("Client send sms", function(data) {
    io.sockets.emit("Server send sms", {
      name: socket.name,
      sms: data.sms
    });
  });

  socket.on("Client focus", function() {
    socket.broadcast.emit("Server focus", { name: socket.name });
  });

  socket.on("Client blur", function() {
    socket.broadcast.emit("Server blur", { name: socket.name });
  });

  /**
   * Room
   */
  socket.on("Client register room", function(data) {
    socket.join(data.name);
    socket.nameRoom = data.name;
    var listRoom = [];
    for (r in socket.adapter.rooms) {
      listRoom.push(r);
    }

    io.sockets.emit("Server list room", { room: listRoom });
    socket.emit("Server send current room", { room: data.name });
  });

  socket.on('Client chat', function (data) {
    io.sockets.in(socket.nameRoom).emit('Server chat', {name: socket.id, sms: data.sms})
  })
});
