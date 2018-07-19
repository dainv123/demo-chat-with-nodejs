// const http = require("http");
// const fs = require("fs");
// var proxy = http.createServer((req, res) => {
//   var rfile = fs.createReadStream(__dirname + "/demo.html");
//   var obj = { id: 1, name: "dai" };
//   if (req.url === "/") {
//     rfile.pipe(res);
//   } else {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(obj));
//   }
// });

// proxy.listen(1129, "127.0.0.1");

require("http").createServer(function(req, res) {
  var fs = require("fs"),
    tmpl = require("blueimp-tmpl"),
    data = {
      title: "JavaScript Templates",
      url: "https://github.com/blueimp/JavaScript-Templates",
      features: ["lightweight & fast", "powerful", "zero dependencies"]
    };
  tmpl.load = function(id) {
    var filename = id + ".html";
    console.log("Loading " + filename);
    return fs.readFileSync(filename, "utf8");
  };
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(tmpl("template", data));
});

var express = require("express");
var app = express();
var fs = require("fs"),
  tmpl = require("blueimp-tmpl"),
  data = {
    title: "JavaScript Templates",
    url: "https://github.com/blueimp/JavaScript-Templates",
    features: ["lightweight & fast", "powerful", "zero dependencies"]
  };

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/contact/:id/send/:content", function(req, res) {
  res.send("Result__ id:" + req.params.id + " __content:" + req.params.content);
});

app.get("/orther", function(req, res) {
  tmpl.load = function(id) {
    var filename = id + ".html";
    console.log("Loading " + filename);
    return fs.readFileSync(filename, "utf8");
  };
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(tmpl("template", data));
});

app.use("/assets", express.static("public"));

app.listen(3000);
