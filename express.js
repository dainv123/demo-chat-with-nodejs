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
