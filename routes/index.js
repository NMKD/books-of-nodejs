var express = require("express");
var router = express.Router({ mergeParams: true });

router.use("/user", require("./login.router"));
router.use("/books", require("./books/books.router"));
router.use("/upload", require("./images/upload.router"));

module.exports = router;
