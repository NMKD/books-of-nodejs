var port = 3000;
var host = "127.0.0.1";
var express = require("express");
var path = require("path");
var routes = require("./routes");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use("/api", routes);
app.use("/api/image/upload", express.static(path.join(__dirname, "upload")));

// app.use(require("./middleware/404"));

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
