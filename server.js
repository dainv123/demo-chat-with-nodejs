var fs = require("fs"),
    tmpl = require("blueimp-tmpl"),
    express = require("express");
var app = express();

app.use("/assets", express.static("public"));

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/contact/:id/send/:content", function (req, res) {
    res.send("Result__ id:" + req.params.id + " __content:" + req.params.content);
});

app.get("/:content", function (req, res) {
    var data = {
        title: "JavaScript Templates",
        url: "https://github.com/",
        features: ["lightweight & fast", "powerful", "zero dependencies"]
    };

    tmpl.load = function (id) {
        var filename = './page/' + id + ".html";
        return fs.readFileSync(filename, "utf8");
    };

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(tmpl(req.params.content, data));
});

var server = require('http').Server(app)
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log("Chao mung: " + socket.id);
    socket.emit('sendsv', { hello: 'server' });
    socket.on('disconnect', function () {
        console.log(socket.id + ' ________ is Leave, :((');
    });

    socket.on('Send data to server', function (data) {
        console.log('Mess from ' + socket.id + ': ' + data.sms);
        var post_mess = { "userid": socket.id, "sms": data.sms };
        // socket.emit('Send data to client', post_mess);
        // socket.broadcast.emit('Send data to client', post_mess);
        // io.to.emit(____socket.id____);
        io.sockets.emit('Send data to client', post_mess);
    });

    socket.on('Send background to server', function (data) {
        var post_mess = { "userid": socket.id, "background": data.sms };
        io.sockets.emit('Send background to client', post_mess);
    });
});

server.listen(3000);