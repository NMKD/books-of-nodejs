var port = 3000;
var host = "127.0.0.1";
var express = require("express");
var routes = require("./routes");

var app = express();
app.use(express.json());
app.use("/images", express.static(__dirname + "/uploads/images"));
app.use("/api", routes);

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
