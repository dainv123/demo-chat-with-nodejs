const EventEmitter = require("events");
class MyEmit extends EventEmitter {}
const myEmit = new MyEmit();
myEmit.on("read", () => {
  console.log(1111);
});
myEmit.emit("read", "Dai rat dep troai.");

const file = require("fs");

file.mkdir("public", function() {
  file.readFile("text.txt", "utf8", function(err, data) {
    file.writeFileSync("./public/wtext.txt", data + "vl222222");
  });
});
